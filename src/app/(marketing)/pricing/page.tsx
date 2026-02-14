import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tiers = [
    {
        name: "Free",
        id: "free",
        price: "$0",
        description: "Perfect for getting started with side hustles.",
        features: [
            "Track up to 1 income source",
            "25 transactions per month",
            "Basic reports (P&L)",
            "Email support",
        ],
        cta: "Get Started",
        href: "/sign-up",
        mostPopular: false,
    },
    {
        name: "Pro",
        id: "pro",
        price: "$9.99",
        description: "For serious gig workers who want to maximize deductions.",
        features: [
            "Unlimited income sources",
            "Unlimited transactions",
            "Advanced tax reports (T2125)",
            "Receipt scanning (OCR)",
            "Mileage tracking with GPS",
            "Priority support",
        ],
        cta: "Start Free Trial",
        href: "/sign-up?plan=pro",
        mostPopular: true,
    },
];

export default function PricingPage() {
    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-400">Pricing</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Choose the right plan for your hustle
                    </p>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
                    Start for free and upgrade as you grow. All plans include secure data storage and tax compliance tools.
                </p>
                <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-8 xl:gap-x-12">
                    {tiers.map((tier) => (
                        <Card key={tier.id} className={cn(
                            "flex flex-col relative",
                            tier.mostPopular ? "border-indigo-500 shadow-indigo-500/20 shadow-lg ring-1 ring-indigo-500" : ""
                        )}>
                            {tier.mostPopular && (
                                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                    <span className="rounded-full bg-indigo-500 px-3 py-1 text-sm font-semibold text-white shadow-sm">
                                        Most Popular
                                    </span>
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="flex items-center gap-x-2 text-xl">
                                    {tier.name}
                                </CardTitle>
                                <CardDescription className="mt-4 text-sm leading-6 text-gray-300">
                                    {tier.description}
                                </CardDescription>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span className="text-4xl font-bold tracking-tight text-white">{tier.price}</span>
                                    <span className="text-sm font-semibold leading-6 text-gray-300">/month</span>
                                </p>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <ul role="list" className="mt-2 space-y-3 text-sm leading-6 text-gray-300">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3">
                                            <Check className="h-6 w-5 flex-none text-indigo-400" aria-hidden="true" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className={cn(
                                    "w-full",
                                    tier.mostPopular ? "bg-indigo-500 hover:bg-indigo-400" : ""
                                )} variant={tier.mostPopular ? "default" : "outline"}>
                                    <Link href={tier.href}>{tier.cta}</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
