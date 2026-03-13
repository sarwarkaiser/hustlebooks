// Demo mode - no auth required
const DEMO_MODE = true;
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  DollarSign,
  CreditCard,
  Activity,
  TrendingUp,
  TrendingDown,
  Wallet,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { DashboardSkeleton } from "@/components/ui/skeleton";
import { EmptyTransactionsState } from "@/components/ui/empty-state";

export const metadata = {
  title: "Dashboard | HustleBooks",
  description: "Track your income, expenses, and tax estimates",
};

async function getDashboardData(userId: string) {
  const supabase = await createClient();

  // Get current year
  const currentYear = new Date().getFullYear();
  const startOfYear = `${currentYear}-01-01`;
  const endOfYear = `${currentYear}-12-31`;

  // Fetch income with source details
  const { data: income, error: incomeError } = await supabase
    .from("income_transactions")
    .select(`
      *,
      income_sources(name, color)
    `)
    .eq("user_id", userId)
    .gte("date", startOfYear)
    .lte("date", endOfYear)
    .order("date", { ascending: false });

  // Fetch expenses with category details
  const { data: expenses, error: expensesError } = await supabase
    .from("expense_transactions")
    .select(`
      *,
      expense_categories(name, icon)
    `)
    .eq("user_id", userId)
    .gte("date", startOfYear)
    .lte("date", endOfYear)
    .order("date", { ascending: false });

  // Fetch mileage
  const { data: mileage, error: mileageError } = await supabase
    .from("mileage_logs")
    .select("deduction, distance_km")
    .eq("user_id", userId)
    .gte("date", startOfYear)
    .lte("date", endOfYear);

  return {
    income: income || [],
    expenses: expenses || [],
    mileage: mileage || [],
    hasError: !!(incomeError || expensesError || mileageError),
  };
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendUp,
  gradient,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  gradient: string;
}) {
  return (
    <Card className="relative overflow-hidden group hover:border-slate-500 transition-all duration-300">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
        <CardTitle className="text-sm font-medium text-slate-300">
          {title}
        </CardTitle>
        <div className="p-2 bg-slate-800/50 rounded-lg">
          <Icon className="h-4 w-4 text-slate-400" />
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-3xl font-bold text-white tracking-tight">
          {value}
        </div>
        <div className="flex items-center gap-2 mt-1">
          {trend && (
            <span
              className={`text-xs font-medium flex items-center gap-0.5 ${
                trendUp ? "text-green-400" : "text-red-400"
              }`}
            >
              {trendUp ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              {trend}
            </span>
          )}
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardContent() {
  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Overview
          </h2>
          <p className="text-slate-400 mt-1">
            Track your business performance and tax obligations
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            asChild
            variant="outline"
            className="border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300"
          >
            <Link href="/expenses/new">
              <Receipt className="mr-2 h-4 w-4" />
              Add Expense
            </Link>
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <Link href="/income/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Income
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Income"
          value="$0.00"
          description="This year"
          icon={DollarSign}
          trend="+12.5%"
          trendUp={true}
          gradient="from-green-500/10 to-emerald-500/10"
        />
        <StatCard
          title="Expenses"
          value="$0.00"
          description="This year"
          icon={CreditCard}
          trend="+8.2%"
          trendUp={false}
          gradient="from-red-500/10 to-orange-500/10"
        />
        <StatCard
          title="Net Income"
          value="$0.00"
          description="This year"
          icon={Wallet}
          trend="+15.3%"
          trendUp={true}
          gradient="from-blue-500/10 to-cyan-500/10"
        />
        <StatCard
          title="Est. Tax"
          value="$0.00"
          description="Set aside"
          icon={Activity}
          gradient="from-purple-500/10 to-pink-500/10"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Income Overview</CardTitle>
                <CardDescription className="text-slate-400">
                  Monthly income for the current year
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs text-slate-400">Income</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <EmptyTransactionsState
                className="w-full h-full border-0 bg-transparent"
                description="Start tracking your income to see your earnings visualized here."
              />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-slate-400">
              Your latest transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <EmptyTransactionsState
                className="w-full h-full border-0 bg-transparent"
                description="Your recent income and expenses will appear here."
                actionLabel="Add First Transaction"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Tax Estimator",
            description: "Calculate your tax obligations",
            href: "/tax-estimator",
            icon: Activity,
            color: "from-purple-500 to-pink-500",
          },
          {
            title: "Mileage Tracker",
            description: "Log your business trips",
            href: "/mileage",
            icon: Receipt,
            color: "from-blue-500 to-cyan-500",
          },
          {
            title: "Reports",
            description: "Generate CRA-compliant reports",
            href: "#",
            icon: TrendingUp,
            color: "from-green-500 to-emerald-500",
          },
        ].map((item) => (
          <Link key={item.title} href={item.href}>
            <Card className="group cursor-pointer hover:border-slate-500 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {item.description}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  // Demo mode - skip auth
  if (!DEMO_MODE) {
    // In production, use: const { userId } = auth();
    // if (!userId) redirect("/sign-in");
  }

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
