"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  DollarSign,
  Receipt,
  Car,
  FileText,
  Plus,
  ArrowRight,
  Inbox,
  Search,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateType = 
  | "income" 
  | "expenses" 
  | "mileage" 
  | "reports" 
  | "transactions" 
  | "search" 
  | "generic";

interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
  icon?: LucideIcon;
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

const defaultConfigs: Record<EmptyStateType, {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  gradient: string;
}> = {
  income: {
    icon: DollarSign,
    title: "No income yet",
    description: "Start tracking your side hustle income to see your earnings grow.",
    actionLabel: "Add Income",
    actionHref: "/income/new",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  expenses: {
    icon: Receipt,
    title: "No expenses tracked",
    description: "Track your business expenses to maximize your tax deductions.",
    actionLabel: "Add Expense",
    actionHref: "/expenses/new",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  mileage: {
    icon: Car,
    title: "No trips recorded",
    description: "Log your business trips to claim vehicle expense deductions.",
    actionLabel: "Log Trip",
    actionHref: "/mileage/new",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  reports: {
    icon: FileText,
    title: "No reports yet",
    description: "Generate reports to see your business performance and tax summaries.",
    actionLabel: "Create Report",
    actionHref: "/reports",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  transactions: {
    icon: DollarSign,
    title: "No transactions",
    description: "Your transactions will appear here once you start tracking.",
    actionLabel: "Add Transaction",
    actionHref: "/income/new",
    gradient: "from-yellow-500/20 to-orange-500/20",
  },
  search: {
    icon: Search,
    title: "No results found",
    description: "Try adjusting your search terms or filters to find what you're looking for.",
    actionLabel: "Clear Filters",
    actionHref: "#",
    gradient: "from-slate-500/20 to-slate-600/20",
  },
  generic: {
    icon: Inbox,
    title: "Nothing here yet",
    description: "Get started by adding your first item.",
    actionLabel: "Get Started",
    actionHref: "/dashboard",
    gradient: "from-blue-500/20 to-purple-500/20",
  },
};

export function EmptyState({
  type = "generic",
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
  icon: CustomIcon,
  secondaryAction,
}: EmptyStateProps) {
  const config = defaultConfigs[type];
  const Icon = CustomIcon || config.icon;
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;
  const displayActionLabel = actionLabel || config.actionLabel;
  const displayActionHref = actionHref || config.actionHref;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-2xl",
        "bg-gradient-to-br border border-white/10",
        config.gradient,
        className
      )}
    >
      {/* Animated Icon Container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl" />
        <div className="relative w-20 h-20 bg-slate-800/80 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
          <Icon className="w-10 h-10 text-slate-300" />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-2xl font-bold text-white mb-3"
      >
        {displayTitle}
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-slate-400 max-w-md mb-8 leading-relaxed"
      >
        {displayDescription}
      </motion.p>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        {onAction ? (
          <Button
            onClick={onAction}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            {displayActionLabel}
          </Button>
        ) : (
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <Link href={displayActionHref}>
              <Plus className="w-4 h-4 mr-2" />
              {displayActionLabel}
            </Link>
          </Button>
        )}

        {secondaryAction && (
          secondaryAction.href ? (
            <Button
              variant="outline"
              asChild
              className="border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white"
            >
              <Link href={secondaryAction.href}>
                {secondaryAction.label}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={secondaryAction.onClick}
              className="border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white"
            >
              {secondaryAction.label}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )
        )}
      </motion.div>
    </motion.div>
  );
}

// Specialized empty states for common use cases
export function EmptyIncomeState(props: Omit<EmptyStateProps, "type">) {
  return <EmptyState type="income" {...props} />;
}

export function EmptyExpensesState(props: Omit<EmptyStateProps, "type">) {
  return <EmptyState type="expenses" {...props} />;
}

export function EmptyMileageState(props: Omit<EmptyStateProps, "type">) {
  return <EmptyState type="mileage" {...props} />;
}

export function EmptyReportsState(props: Omit<EmptyStateProps, "type">) {
  return <EmptyState type="reports" {...props} />;
}

export function EmptyTransactionsState(props: Omit<EmptyStateProps, "type">) {
  return <EmptyState type="transactions" {...props} />;
}

export function EmptySearchResults(props: Omit<EmptyStateProps, "type">) {
  return <EmptyState type="search" {...props} />;
}
