"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, DollarSign, Briefcase, Calendar, Edit2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const mockSources = [
  {
    id: "1",
    name: "Freelance Design",
    description: "Web and graphic design projects",
    type: "freelance",
    created_at: "2024-01-15",
    estimated_monthly_income: 2500,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "2",
    name: "Uber",
    description: "Rideshare driving",
    type: "gig",
    created_at: "2024-02-01",
    estimated_monthly_income: 800,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "3",
    name: "Consulting",
    description: "Business consulting calls",
    type: "consulting",
    created_at: "2024-02-20",
    estimated_monthly_income: 1200,
    color: "from-purple-500 to-pink-500",
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

export default function IncomeSourcesPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Income Sources</h1>
          <p className="text-slate-400 mt-1">Manage your side hustle income streams</p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
        >
          <Link href="/income/sources/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Source
          </Link>
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-white">Total Monthly Estimate</p>
                <p className="text-2xl font-bold text-white">
                  ${mockSources.reduce((sum, s) => sum + (s.estimated_monthly_income || 0), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockSources.map((source, index) => (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:border-slate-500 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-gradient-to-br ${source.color} rounded-lg shadow-lg group-hover:scale-110 transition-transform`}>
                        <Briefcase className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">{source.name}</CardTitle>
                        <p className="text-sm text-slate-400">{source.description}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-slate-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Created {new Date(source.created_at).toLocaleDateString()}</span>
                    </div>
                    {source.estimated_monthly_income && (
                      <div className="flex items-center text-slate-300">
                        <DollarSign className="h-4 w-4 mr-2 text-green-400" />
                        <span className="font-medium">${source.estimated_monthly_income.toLocaleString()}/month</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-600 bg-slate-800/50 text-slate-300"
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button variant="outline" asChild className="border-slate-600 bg-slate-800/50 text-slate-300">
          <Link href="/income">← Back to Income</Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
