"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calculator,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Info,
  Calendar,
  FileText,
  ArrowUpRight,
  PiggyBank,
  Percent,
  Briefcase,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";

// Mock data
const mockTaxData = {
  totalIncome: 15750.0,
  totalExpenses: 2450.5,
  mileageDeduction: 673.75,
  netIncome: 12625.75,
  federalTax: 1893.86,
  provincialTax: 638.46,
  cpp: 544.73,
  ei: 209.59,
  totalTax: 3286.64,
  effectiveRate: 26.03,
};

const quarterlyDates = [
  { quarter: "Q1", date: "Mar 15", amount: 821.66 },
  { quarter: "Q2", date: "Jun 15", amount: 821.66 },
  { quarter: "Q3", date: "Sep 15", amount: 821.66 },
  { quarter: "Q4", date: "Dec 15", amount: 821.66 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function TaxBreakdownItem({
  label,
  amount,
  icon: Icon,
  color,
  description,
}: {
  label: string;
  amount: number;
  icon: React.ElementType;
  color: string;
  description?: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="group flex items-center justify-between p-4 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-200"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="font-medium text-white">{label}</p>
          {description && (
            <p className="text-xs text-slate-400">{description}</p>
          )}
        </div>
      </div>
      <span className="font-semibold text-white">
        ${amount.toLocaleString("en-CA", { minimumFractionDigits: 2 })}
      </span>
    </motion.div>
  );
}

export default function TaxEstimatorPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Tax Estimator</h1>
          <p className="text-slate-400 mt-1">
            Calculate your estimated tax obligations
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          className="border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300"
        >
          <Link href="/tax-estimator/settings">
            <Calculator className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </Button>
      </motion.div>

      {/* Tax Year Info */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-white">2024 Tax Year</p>
                <p className="text-sm text-slate-400 mt-1">
                  Estimates are based on your tracked income, expenses, and current CRA tax rates for British Columbia. 
                  Actual tax liability may vary based on your complete financial situation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Income Summary */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Income Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-800/30 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-slate-400">Total Income</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  ${mockTaxData.totalIncome.toLocaleString("en-CA", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-4 bg-slate-800/30 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-slate-400">Expenses</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  ${mockTaxData.totalExpenses.toLocaleString("en-CA", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-4 bg-slate-800/30 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-slate-400">Mileage</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  ${mockTaxData.mileageDeduction.toLocaleString("en-CA", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-300">Net Income</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  ${mockTaxData.netIncome.toLocaleString("en-CA", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tax Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Tax Breakdown</CardTitle>
                <div className="flex items-center gap-2 text-sm">
                  <Percent className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400">
                    Effective Rate: {mockTaxData.effectiveRate.toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <TaxBreakdownItem
                label="Federal Tax"
                amount={mockTaxData.federalTax}
                icon={TrendingUp}
                color="bg-blue-500"
                description="15% - 33% based on income bracket"
              />
              <TaxBreakdownItem
                label="Provincial Tax (BC)"
                amount={mockTaxData.provincialTax}
                icon={TrendingUp}
                color="bg-purple-500"
                description="5.06% - 20.5% based on income bracket"
              />
              <TaxBreakdownItem
                label="CPP Contributions"
                amount={mockTaxData.cpp}
                icon={Briefcase}
                color="bg-orange-500"
                description="5.95% on pensionable earnings"
              />
              <TaxBreakdownItem
                label="EI Premiums"
                amount={mockTaxData.ei}
                icon={Shield}
                color="bg-red-500"
                description="1.66% on insurable earnings"
              />

              <div className="pt-3 border-t border-slate-700">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                      <PiggyBank className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Total Tax Owing</p>
                      <p className="text-xs text-slate-400">
                        Estimated annual obligation
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-white">
                    ${mockTaxData.totalTax.toLocaleString("en-CA", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quarterly Installments */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-white">Quarterly Installments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-400">
                If your net tax owing exceeds $3,000, you may need to make quarterly installment payments.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {quarterlyDates.map((q, index) => (
                  <motion.div
                    key={q.quarter}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-300">
                        {q.quarter}
                      </span>
                      <span className="text-xs text-slate-500">{q.date}</span>
                    </div>
                    <p className="text-xl font-bold text-white">
                      ${q.amount.toFixed(2)}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-200">Installment Reminder</p>
                    <p className="text-sm text-yellow-400/80 mt-1">
                      Next payment due March 15, 2024. Set aside $821.66 monthly to stay on track.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Important Notes */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-400" />
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>This is an estimate based on 2024 federal and BC provincial tax rates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Actual tax liability may vary based on deductions, credits, and other income</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Consult a tax professional for accurate tax planning and filing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Quarterly installments are required if your net tax owing exceeds $3,000</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Tax filing deadline for self-employed: June 15, 2025</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/reports">
            <div className="group p-4 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-200 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Generate Tax Report</p>
                    <p className="text-sm text-slate-400">
                      Create CRA-ready T2125 form
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
              </div>
            </div>
          </Link>
          <Link href="/tax-estimator/settings">
            <div className="group p-4 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-200 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Adjust Settings</p>
                    <p className="text-sm text-slate-400">
                      Update province and deductions
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
              </div>
            </div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
