"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Car,
  Plus,
  MapPin,
  Calendar,
  TrendingUp,
  Gauge,
  DollarSign,
  ArrowUpRight,
  MoreHorizontal,
  Navigation,
} from "lucide-react";
import { EmptyMileageState } from "@/components/ui/empty-state";
import { motion } from "framer-motion";

// Mock data
const mockTrips = [
  {
    id: "1",
    date: "2024-03-15",
    purpose: "Client Meeting - Downtown",
    distance: 45.2,
    deduction: 31.64,
    startLocation: "Home",
    endLocation: "Client Office",
  },
  {
    id: "2",
    date: "2024-03-14",
    purpose: "Delivery Route",
    distance: 32.5,
    deduction: 22.75,
    startLocation: "Home",
    endLocation: "Various",
  },
  {
    id: "3",
    date: "2024-03-12",
    purpose: "Supply Run",
    distance: 18.3,
    deduction: 12.81,
    startLocation: "Home",
    endLocation: "Staples",
  },
];

const stats = {
  totalDistance: 962.5,
  totalDeduction: 673.75,
  tripsCount: 24,
  avgTripDistance: 40.1,
};

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

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
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
              <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
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

export default function MileagePage() {
  const hasTrips = mockTrips.length > 0;

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
          <h1 className="text-3xl font-bold text-white">Mileage Tracker</h1>
          <p className="text-slate-400 mt-1">
            Log business trips and track vehicle deductions
          </p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
        >
          <Link href="/mileage/new">
            <Plus className="mr-2 h-4 w-4" />
            Log Trip
          </Link>
        </Button>
      </motion.div>

      {/* CRA Rate Info */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Car className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-white">CRA Mileage Rate 2024</p>
                <p className="text-sm text-slate-400">
                  First 5,000 km: $0.70/km | Over 5,000 km: $0.64/km
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">$0.70</p>
              <p className="text-xs text-slate-400">per km</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 md:grid-cols-4"
      >
        <StatCard
          title="Total Distance"
          value={`${stats.totalDistance.toFixed(1)} km`}
          subtitle="This year"
          icon={Gauge}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Tax Deduction"
          value={`$${stats.totalDeduction.toFixed(2)}`}
          subtitle="Total savings"
          icon={DollarSign}
          gradient="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Total Trips"
          value={stats.tripsCount.toString()}
          subtitle="Business trips"
          icon={Car}
          gradient="from-purple-500 to-pink-500"
        />
        <StatCard
          title="Avg. Trip"
          value={`${stats.avgTripDistance.toFixed(1)} km`}
          subtitle="Per trip"
          icon={TrendingUp}
          gradient="from-yellow-500 to-orange-500"
        />
      </motion.div>

      {/* Recent Trips */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Recent Trips</CardTitle>
            <Button variant="ghost" size="sm" className="text-slate-400">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {hasTrips ? (
              <div className="space-y-3">
                {mockTrips.map((trip, index) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex items-center justify-between p-4 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Navigation className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{trip.purpose}</p>
                        <div className="flex items-center gap-3 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(trip.date).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {trip.startLocation} → {trip.endLocation}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-lg font-semibold text-white">
                          {trip.distance.toFixed(1)} km
                        </span>
                        <p className="text-sm text-green-400">
                          +${trip.deduction.toFixed(2)}
                        </p>
                      </div>
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
              <EmptyMileageState />
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Link href="/mileage/new">
                <div className="group p-4 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-200 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Plus className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Log New Trip</p>
                        <p className="text-sm text-slate-400">
                          Record a business trip
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
              <div className="group p-4 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-200 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Car className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Vehicle Settings</p>
                      <p className="text-sm text-slate-400">
                        Manage your vehicles
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
