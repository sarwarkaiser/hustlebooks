import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function SubscriptionPage() {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
        redirect("/sign-in");
    }

    const supabase = createClient();
    const { data: subscription } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .single();

    const isPro = subscription?.status === "active";

    // This would ideally come from environment variables or a config file
    const proPriceId = "price_1234567890"; // Replace with your actual Stripe price ID

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Current Plan Card */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Current Plan</CardTitle>
                        <CardDescription>
                            Manage your subscription and billing details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-full",
                                    isPro ? "bg-indigo-500/20" : "bg-gray-500/20"
                                )}>
                                    {isPro ? (
                                        <CreditCard className="h-5 w-5 text-indigo-500" />
                                    ) : (
                                        <CreditCard className="h-5 w-5 text-gray-500" />
                                    )}
                                </div>
                                <div>
                                    <div className="font-medium">
                                        {isPro ? "Pro Plan" : "Free Plan"}
                                        {isPro && (
                                            <Badge variant="secondary" className="ml-2 bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30">
                                                Active
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {isPro
                                            ? "Your next billing date is " + new Date(subscription.stripe_current_period_end).toLocaleDateString()
                                            : "Upgrade to unlock advanced features."
                                        }
                                    </div>
                                </div>
                            </div>

                            <form action="/api/checkout" method="POST">
                                {/* 
                  Note: In a real app, this form submission would be handled by a client component 
                  calling the API to get the checkout URL, then redirecting. 
                  For server component simplicity here, assume we have a way to trigger it 
                  or use a client component wrapper.
                */}
                                <input type="hidden" name="priceId" value={isPro ? "" : proPriceId} />
                                <Button variant={isPro ? "outline" : "default"}>
                                    {isPro ? "Manage Subscription" : "Upgrade to Pro"}
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>

                {isPro && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Pro Features Active</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    Unlimited income sources
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    Unlimited transactions
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    T2125 Tax Reports
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

// Helper utility for classnames
function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}
