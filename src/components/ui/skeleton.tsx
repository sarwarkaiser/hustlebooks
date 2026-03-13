import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "card" | "avatar" | "text" | "chart" | "stat";
  lines?: number;
}

function SkeletonBase({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-800/50",
        className
      )}
      {...props}
    />
  );
}

export function Skeleton({ className, variant = "default", lines = 3 }: SkeletonProps) {
  if (variant === "card") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "rounded-2xl border bg-slate-800/30 backdrop-blur-sm border-slate-700/50 p-6 space-y-4",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <SkeletonBase className="h-5 w-1/3" />
          <SkeletonBase className="h-8 w-8 rounded-lg" />
        </div>
        <SkeletonBase className="h-10 w-2/3" />
        <SkeletonBase className="h-4 w-1/2" />
      </motion.div>
    );
  }

  if (variant === "stat") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "rounded-2xl border bg-slate-800/30 backdrop-blur-sm border-slate-700/50 p-6",
          className
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <SkeletonBase className="h-4 w-24" />
          <SkeletonBase className="h-4 w-4 rounded" />
        </div>
        <SkeletonBase className="h-8 w-32 mb-2" />
        <SkeletonBase className="h-3 w-20" />
      </motion.div>
    );
  }

  if (variant === "avatar") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <SkeletonBase className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <SkeletonBase className="h-4 w-24" />
          <SkeletonBase className="h-3 w-16" />
        </div>
      </div>
    );
  }

  if (variant === "text") {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonBase
            key={i}
            className={cn("h-4", i === lines - 1 ? "w-2/3" : "w-full")}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    );
  }

  if (variant === "chart") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "rounded-2xl border bg-slate-800/30 backdrop-blur-sm border-slate-700/50 p-6",
          className
        )}
      >
        <SkeletonBase className="h-6 w-32 mb-6" />
        <div className="flex items-end gap-2 h-[200px]">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonBase
              key={i}
              className="flex-1 rounded-t"
              style={{ 
                height: `${Math.random() * 60 + 20}%`,
                animationDelay: `${i * 50}ms`
              }}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return <SkeletonBase className={cn("h-4 w-full", className)} />;
}

// Dashboard Skeleton
export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <SkeletonBase className="h-8 w-48" />
          <SkeletonBase className="h-4 w-32" />
        </div>
        <SkeletonBase className="h-10 w-32 rounded-xl" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="stat" />
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <Skeleton variant="chart" className="h-[400px]" />
        </div>
        <div className="col-span-3">
          <Skeleton variant="card" className="h-[400px]" />
        </div>
      </div>
    </div>
  );
}

// Table Skeleton
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4 pb-3 border-b border-slate-700/50">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBase key={i} className="h-4 flex-1" style={{ animationDelay: `${i * 50}ms` }} />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex gap-4 py-3">
          {Array.from({ length: 4 }).map((_, colIdx) => (
            <SkeletonBase
              key={colIdx}
              className="h-4 flex-1"
              style={{ animationDelay: `${(rowIdx * 4 + colIdx) * 30}ms` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Page Skeleton
export function PageSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <SkeletonBase className="h-10 w-64" />
          <SkeletonBase className="h-5 w-96" />
        </div>
        <SkeletonBase className="h-12 w-40 rounded-xl" />
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} variant="card" />
        ))}
      </div>

      <Skeleton variant="card" className="h-[400px]" />
    </div>
  );
}
