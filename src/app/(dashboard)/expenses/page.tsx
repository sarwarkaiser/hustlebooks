"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Receipt,
  Plus,
  Filter,
  Calendar,
  DollarSign,
  Upload,
  Search,
  TrendingDown,
  Tag,
  MoreHorizontal,
  ArrowUpRight,
  ScanLine,
  FileSpreadsheet,
} from "lucide-react";
import { EmptyExpensesState } from "@/components/ui/empty-state";
import { motion } from "framer-motion";

// Mock data for demonstration
const mockExpenses = [
  {
    id: "1",
    description: "Office Supplies",
    amount: 125.5,
    date: "2024-03-15",
    category: "Office Expenses",
    vendor: "Staples",
    receipt: true,
  },
  {
    id: "2",
    description: "Gas",
    amount: 65.0,
    date: "2024-03-14",
    category: "Motor Vehicle",
    vendor: "Shell",
    receipt: true,
  },
  {
    id: "3",
    description: "Client Lunch",
    amount: 45.25,
    date: "2024-03-12",
    category: "Meals",
    vendor: "Boston Pizza",
    receipt: false,
  },
];

const categories = [
  { name: "Motor Vehicle", count: 12, total: 845.5, color: "from-blue-500 to-cyan-500" },
  { name: "Office Expenses", count: 8, total: 425.25, color: "from-green-500 to-emerald-500" },
  { name: "Meals", count: 5, total: 225.75, color: "from-yellow-500 to-orange-500" },
  { name: "Phone & Internet", count: 3, total: 180.0, color: "from-purple-500 to-pink-500" },
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

export default function ExpensesPage() {
  const hasExpenses = mockExpenses.length > 0;
  const totalExpenses = mockExpenses.reduce((sum, exp) => sum + exp.amount, 0);

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
          <h1 className="text-3xl font-bold text-white">Expenses</h1>
          <p className="text-slate-400 mt-1">
            Track and manage your business expenses
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            asChild
            className="border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300"
          >
            <Link href="/expenses/import">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Import
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300"
          >
            <Link href="/expenses/scan">
              <ScanLine className="mr-2 h-4 w-4" />
              Scan
            </Link>
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <Link href="/expenses/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
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
          title="Total Expenses"
          value={`$${totalExpenses.toLocaleString("en-CA", {
            minimumFractionDigits: 2,
          })}`}
          subtitle="This year"
          icon={DollarSign}
          trend="-12%"
          trendUp={false}
          gradient="from-red-500 to-orange-500"
        />
        <StatCard
          title="Transactions"
          value={mockExpenses.length.toString()}
          subtitle="Total count"
          icon={Receipt}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Categories"
          value={categories.length.toString()}
          subtitle="Active"
          icon={Tag}
          gradient="from-purple-500 to-pink-500"
        />
        <StatCard
          title="Tax Savings"
          value={`$${(totalExpenses * 0.25).toFixed(2)}`}
          subtitle="Estimated"
          icon={TrendingDown}
          gradient="from-green-500 to-emerald-500"
        />
      </motion.div>

      {/* Search and Filter */}
      <motion.div variants={itemVariants} className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search expenses..."
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
        {/* Expenses List */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Recent Expenses</CardTitle>
              <Button variant="ghost" size="sm" className="text-slate-400">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {hasExpenses ? (
                <div className="space-y-3">
                  {mockExpenses.map((expense, index) => (
                    <motion.div
                      key={expense.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group flex items-center justify-between p-4 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                            expense.category === "Motor Vehicle"
                              ? "from-blue-500 to-cyan-500"
                              : expense.category === "Office Expenses"
                              ? "from-green-500 to-emerald-500"
                              : "from-yellow-500 to-orange-500"
                          } flex items-center justify-center`}
                        >
                          <Receipt className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {expense.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <span>{expense.vendor}</span>
                            <span>•</span>
                            <span>
                              {new Date(expense.date).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span className="px-2 py-0.5 bg-slate-700/50 rounded-full text-xs">
                              {expense.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-semibold text-white">
                          -${expense.amount.toFixed(2)}
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
                <EmptyExpensesState />
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Categories */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-white">Top Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}
                      >
                        <Tag className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">
                          {category.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {category.count} transactions
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-white">
                      ${category.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(category.total / 845.5) * 100}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${category.color}`}
                    />
                  </div>
                </motion.div>
              ))}

              <Link href="/expenses/categories">
                <Button
                  variant="ghost"
                  className="w-full mt-4 text-slate-400 hover:text-white"
                >
                  View All Categories
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
