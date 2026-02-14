import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

const settingsUrl = process.env.NEXT_PUBLIC_APP_URL + "/settings/subscription";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userEmail = user.emailAddresses[0].emailAddress;

        // Get user's subscription from Supabase
        const supabase = createClient();
        const { data: dbUser } = await supabase
            .from("subscriptions")
            .select("stripe_customer_id")
            .eq("user_id", userId)
            .single();

        let stripeCustomerId = dbUser?.stripe_customer_id;

        // Create Stripe customer if doesn't exist
        if (!stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: userEmail,
                metadata: {
                    userId,
                },
            });

            stripeCustomerId = customer.id;

            // Save to Supabase
            await supabase.from("subscriptions").upsert({
                user_id: userId,
                stripe_customer_id: stripeCustomerId,
                status: "inactive",
            });
        }

        // Check if we're creating a new subscription or managing existing one
        const { priceId } = await req.json();

        if (priceId) {
            // Create Checkout Session
            const stripeSession = await stripe.checkout.sessions.create({
                success_url: settingsUrl,
                cancel_url: settingsUrl,
                payment_method_types: ["card"],
                mode: "subscription",
                billing_address_collection: "auto",
                customer: stripeCustomerId,
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                metadata: {
                    userId,
                },
            });

            return NextResponse.json({ url: stripeSession.url });
        } else {
            // Create Portal Session (for managing existing subscription)
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: stripeCustomerId,
                return_url: settingsUrl,
            });

            return NextResponse.json({ url: stripeSession.url });
        }
    } catch (error) {
        console.log("[STRIPE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
