"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  DollarSign,
  Receipt,
  Car,
  Calculator,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  FileText,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  subItems?: { href: string; label: string }[];
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  {
    href: "/income",
    label: "Income",
    icon: DollarSign,
    subItems: [
      { href: "/income", label: "All Income" },
      { href: "/income/sources", label: "Sources" },
      { href: "/income/new", label: "Add Income" },
    ],
  },
  {
    href: "/expenses",
    label: "Expenses",
    icon: Receipt,
    subItems: [
      { href: "/expenses", label: "All Expenses" },
      { href: "/expenses/new", label: "Add Expense" },
      { href: "/expenses/scan", label: "Scan Receipt" },
    ],
  },
  { href: "/mileage", label: "Mileage", icon: Car },
  { href: "/tax-estimator", label: "Tax Estimator", icon: Calculator },
];

const bottomNavItems: NavItem[] = [
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/settings/subscription", label: "Settings", icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(["/income", "/expenses"]);

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href) ? prev.filter((h) => h !== href) : [...prev, href]
    );
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-slate-950/95 backdrop-blur-xl border-r border-white/10",
        className
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between h-20 px-4 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg shadow-blue-500/30 flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap"
              >
                HustleBooks
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-white hover:bg-white/10"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3">
        {navItems.map((item) => (
          <div key={item.href}>
            <Link href={item.subItems ? "#" : item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => item.subItems && toggleExpanded(item.href)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer",
                  isActive(item.href)
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive(item.href) && "text-blue-400")} />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-medium whitespace-nowrap flex-1"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!collapsed && item.subItems && (
                  <motion.span
                    animate={{ rotate: expandedItems.includes(item.href) ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* SubItems */}
            <AnimatePresence>
              {!collapsed && item.subItems && expandedItems.includes(item.href) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="ml-6 pl-4 border-l border-white/10 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link key={subItem.href} href={subItem.href}>
                        <motion.div
                          whileHover={{ x: 4 }}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                            pathname === subItem.href
                              ? "text-blue-400 bg-blue-500/10"
                              : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                          )}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {subItem.label}
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10 space-y-1">
        {bottomNavItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <motion.div
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                isActive(item.href)
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive(item.href) && "text-blue-400")} />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-medium whitespace-nowrap flex-1"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        ))}

        {/* Pro Badge */}
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="font-semibold text-white text-sm">Pro Plan</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Unlock all features</p>
            <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
              Upgrade
            </Button>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
}
