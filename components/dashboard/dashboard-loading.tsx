"use client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { motion } from "motion/react";

export function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Loading...</h3>
          <p className="text-sm text-gray-600">Please wait while we prepare your dashboard</p>
        </div>
        
        {/* Animated dots */}
        <div className="flex justify-center space-x-1">
          <motion.div
            className="w-2 h-2 bg-purple-500 rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 bg-blue-500 rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-indigo-500 rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
