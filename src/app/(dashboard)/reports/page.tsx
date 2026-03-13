"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  DollarSign,
  Car,
  PieChart,
  BarChart3,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";

const reportTypes = [
  {
    id: "t2125",
    name: "T2125 Form",
    description: "Statement of Business or Professional Activities",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    available: true,
    features: ["CRA Compliant", "Auto-calculated", "Ready to file"],
  },
  {
    id: "profit-loss",
    name: "Profit & Loss",
    description: "Income and expense summary by period",
    icon: BarChart3,
    color: "from-green-500 to-emerald-500",
    available: true,
    features: ["Monthly view", "Year-over-year", "Export to Excel"],
  },
  {
    id: "expense-summary",
    name: "Expense Summary",
    description: "Detailed breakdown of all expenses by category",
    icon: PieChart,
    color: "from-purple-500 to-pink-500",
    available: true,
    features: ["Category breakdown", "Receipts included", "Tax savings"],
  },
  {
    id: "mileage-log",
    name: "Mileage Log",
    description: "Complete vehicle log for tax deduction",
    icon: Car,
    color: "from-yellow-500 to-orange-500",
    available: true,
    features: ["CRA format", "Trip details", "Deduction summary"],
  },
  {
    id: "tax-summary",
    name: "Tax Summary",
    description: "Comprehensive tax estimate and breakdown",
    icon: DollarSign,
    color: "from-red-500 to-rose-500",
    available: true,
    features: ["Federal & Provincial", "CPP & EI", "Installments"],
  },
  {
    id: "audit-ready",
    name: "Audit Package",
    description: "Complete documentation package for CRA audit",
    icon: Lock,
    color: "from-slate-500 to-slate-600",
    available: false,
    features: ["Pro feature", "All receipts", "Full documentation"],
  },
];

const recentReports = [
  {
    id: "1",
    name: "Q1 2024 Tax Summary",
    type: "Tax Summary",
    date: "Mar 15, 2024",
    status: "ready",
  },
  {
    id: "2",
    name: "February P&L Statement",
    type: "Profit & Loss",
    date: "Mar 1, 2024",
    status: "ready",
  },
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

export default function ReportsPage() {
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
          <h1 className="text-3xl font-bold text-white">Reports</h1>
          <p className="text-slate-400 mt-1">
            Generate CRA-compliant reports for tax filing
          </p>
        </div>
        <Button
          variant="outline"
          className="border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300"
        >
          <Clock className="mr-2 h-4 w-4" />
          Report History
        </Button>
      </motion.div>

      {/* Tax Year Selection */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Tax Year 2024</p>
                  <p className="text-sm text-slate-400">
                    Reports will be generated for the current tax year
                  </p>
                </div>
              </div>
              <select className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                <option>2024 (Current)</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Report Types Grid */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-semibold text-white mb-4">Available Reports</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reportTypes.map((report) => (
            <motion.div
              key={report.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className={`group relative ${!report.available ? "opacity-75" : ""}`}
            >
              <Card className="h-full hover:border-slate-500 transition-all duration-300 overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${report.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${report.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <report.icon className="w-6 h-6 text-white" />
                    </div>
                    {!report.available && (
                      <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-400">
                        Pro
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-white mt-4">{report.name}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {report.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {report.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-slate-400"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                    disabled={!report.available}
                  >
                    {report.available ? (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Generate Report
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Upgrade to Pro
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Reports */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white">Recent Reports</CardTitle>
              <CardDescription className="text-slate-400">
                Previously generated reports
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-400">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {recentReports.length > 0 ? (
              <div className="space-y-3">
                {recentReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{report.name}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>{report.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                        {report.status}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-white"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <FileText className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                <p>No reports generated yet</p>
                <p className="text-sm">Generate your first report above</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Help Section */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Need help with your taxes?
                  </h3>
                  <p className="text-slate-400 text-sm max-w-xl">
                    Our reports are designed to make tax filing easy. If you need assistance,
                    consider consulting with a tax professional who can review your reports.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 whitespace-nowrap"
              >
                Find an Accountant
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
