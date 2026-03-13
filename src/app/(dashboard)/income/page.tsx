"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Plus,
  Filter,
  Search,
  TrendingUp,
  Wallet,
  Building2,
  ArrowUpRight,
  MoreHorizontal,
  Briefcase,
  Calendar,
  Download,
} from "lucide-react";
import { EmptyIncomeState } from "@/components/ui/empty-state";
import { motion } from "framer-motion";

// Mock data for demonstration
const mockIncome = [
  {
    id: "1",
    description: "Freelance Project - Website Design",
    amount: 2500.0,
    date: "2024-03-15",
    source: "Freelance Design",
    client: "ABC Company",
    status: "received",
  },
  {
    id: "2",
    description: "Uber Earnings",
    amount: 450.75,
    date: "2024-03-14",
    source: "Uber",
    client: "Various",
    status: "received",
  },
  {
    id: "3",
    description: "Consulting Call",
    amount: 200.0,
    date: "2024-03-12",
    source: "Consulting",
    client: "Tech Startup",
    status: "pending",
  },
];

const incomeSources = [
  { name: "Freelance Design", amount: 8500, count: 5, color: "from-blue-500 to-cyan-500" },
  { name: "Uber", amount: 3200, count: 12, color: "from-green-500 to-emerald-500" },
  { name: "Consulting", amount: 1500, count: 3, color: "from-purple-500 to-pink-500" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendUp,
  gradient,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  gradient: string;
}) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="group hover:border-slate-500 transition-all duration-300 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />
        <CardContent className="p-6 relative">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">{title}</p>
              <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
              <div className="flex items-center gap-2 mt-1">
                {trend && (
                  <span
                    className={`text-xs font-medium ${
                      trendUp ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {trend}
                  </span>
                )}
                <span className="text-xs text-slate-500">{subtitle}</span>
              </div>
            </div>
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function IncomePage() {
  const hasIncome = mockIncome.length > 0;
  const totalIncome = mockIncome.reduce((sum, inc) => sum + inc.amount, 0);

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
          <h1 className="text-3xl font-bold text-white">Income</h1>
          <p className="text-slate-400 mt-1">
            Track all your earnings from various sources
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            asChild
            className="border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300"
          >
            <Link href="/income/sources">
              <Building2 className="mr-2 h-4 w-4" />
              Sources
            </Link>
          </Button>
          <Button
            variant="outline"
            className="border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <Link href="/income/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Income
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 md:grid-cols-4"
      >
        <StatCard
          title="Total Income"
          value={`$${totalIncome.toLocaleString("en-CA", {
            minimumFractionDigits: 2,
          })}`}
          subtitle="This year"
          icon={DollarSign}
          trend="+23%"
          trendUp={true}
          gradient="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Transactions"
          value={mockIncome.length.toString()}
          subtitle="Total count"
          icon={Wallet}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Income Sources"
          value={incomeSources.length.toString()}
          subtitle="Active"
          icon={Briefcase}
          gradient="from-purple-500 to-pink-500"
        />
        <StatCard
          title="Avg. Transaction"
          value={`$${(totalIncome / mockIncome.length || 0).toFixed(2)}`}
          subtitle="Per transaction"
          icon={TrendingUp}
          gradient="from-yellow-500 to-orange-500"
        />
      </motion.div>

      {/* Search and Filter */}
      <motion.div variants={itemVariants} className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search income transactions..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          />
        </div>
        <Button
          variant="outline"
          className="border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button
          variant="outline"
          className="border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300"
        >
          <Calendar className="mr-2 h-4 w-4" />
          This Year
        </Button>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Income List */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Recent Income</CardTitle>
              <Button variant="ghost" size="sm" className="text-slate-400">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {hasIncome ? (
                <div className="space-y-3">
                  {mockIncome.map((income, index) => (
                    <motion.div
                      key={income.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group flex items-center justify-between p-4 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                            income.source === "Freelance Design"
                              ? "from-blue-500 to-cyan-500"
                              : income.source === "Uber"
                              ? "from-green-500 to-emerald-500"
                              : "from-purple-500 to-pink-500"
                          } flex items-center justify-center`}
                        >
                          <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {income.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <span>{income.client}</span>
                            <span>•</span>
                            <span>
                              {new Date(income.date).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs ${
                                income.status === "received"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {income.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-semibold text-green-400">
                          +${income.amount.toFixed(2)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <EmptyIncomeState />
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Income Sources */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Income Sources</CardTitle>
              <Button variant="ghost" size="sm" className="text-slate-400" asChild>
                <Link href="/income/sources">Manage</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {incomeSources.map((source, index) => (
                <motion.div
                  key={source.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${source.color} flex items-center justify-center`}
                      >
                        <Briefcase className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">
                          {source.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {source.count} transactions
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-white">
                      ${source.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(source.amount / 8500) * 100}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${source.color}`}
                    />
                  </div>
                </motion.div>
              ))}

              <Link href="/income/sources/new">
                <Button
                  variant="ghost"
                  className="w-full mt-4 text-slate-400 hover:text-white"
                >
                  Add New Source
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
