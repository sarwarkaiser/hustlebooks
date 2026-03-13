"use client";

import { Component, type ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // Here you could send to an error tracking service like Sentry
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

function ErrorFallback({
  error,
  onRetry,
}: {
  error?: Error;
  onRetry: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-red-500/30"
          >
            <AlertTriangle className="w-12 h-12 text-red-400" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Something went wrong
          </h1>
          <p className="text-slate-400">
            We apologize for the inconvenience. Our team has been notified.
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 mb-6">
          <p className="text-sm text-slate-400 mb-2">Error details:</p>
          <code className="block p-3 bg-slate-950 rounded-lg text-red-400 text-sm overflow-x-auto">
            {error?.message || "Unknown error occurred"}
          </code>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onRetry}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button
            variant="outline"
            asChild
            className="flex-1 border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300"
          >
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Need help?{" "}
            <a
              href="mailto:support@hustlebooks.ca"
              className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
            >
              <Mail className="w-3 h-3" />
              Contact Support
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Specialized error boundary for dashboard
export function DashboardErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 text-center">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Dashboard Error
              </h2>
              <p className="text-slate-400 mb-6">
                We couldn&apos;t load your dashboard. Please try refreshing the page.
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Page
              </Button>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
