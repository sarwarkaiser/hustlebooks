"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function SubscriptionPage() {
  const isPro = true; // Demo mode - show as Pro

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Subscription</h1>
          <p className="text-slate-400 mt-1">Manage your plan and billing</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Current Plan
            </CardTitle>
            <CardDescription className="text-slate-400">
              You&apos;re on the Pro plan with full access to all features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/50 p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-white text-lg">
                    Pro Plan
                    <Badge className="ml-2 bg-green-500/20 text-green-400 hover:bg-green-500/30">
                      Active
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-400">
                    Demo mode - all features unlocked
                  </div>
                </div>
              </div>
              <Button variant="outline" className="border-slate-600 bg-slate-800/50 text-slate-300">
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-white">Pro Features</CardTitle>
              <CardDescription className="text-slate-400">
                Everything included in your plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Unlimited income sources",
                  "Unlimited transactions",
                  "Receipt scanning (OCR)",
                  "Mileage tracking",
                  "Tax estimator",
                  "T2125 & all reports",
                  "Priority support",
                  "Data export",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-green-400" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-white">Billing History</CardTitle>
              <CardDescription className="text-slate-400">
                Recent invoices and payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-slate-500">
                <CreditCard className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                <p>No billing history in demo mode</p>
                <p className="text-sm">Subscription data would appear here</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
