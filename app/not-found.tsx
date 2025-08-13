"use client";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, AlertTriangle, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 relative overflow-hidden">
      {/* Aitopia Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-200/10 to-blue-200/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="w-full  max-w-md text-center relative z-10">
        {/* 404 Number with Aitopia styling */}
        <div className="mb-6 relative">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent leading-none relative">
            404
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 blur-xl opacity-30 animate-pulse"></div>
          </h1>
          <div className="absolute -top-3 -right-3">
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
          <div className="absolute -bottom-3 -left-3">
            <Zap className="w-6 h-6 text-blue-400 animate-pulse animation-delay-1000" />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl relative">
              <AlertTriangle className="w-8 h-8 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Page Not Found
          </h2>
          
          <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons with Aitopia styling */}
        <div className="space-y-3">
          <Button 
            onClick={() => router.back()}
            className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 border-0 text-sm py-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          
          <Button asChild variant="outline" className="w-full border-purple-300 hover:bg-purple-50 text-purple-700 hover:text-purple-800 text-sm py-2">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Help Section with Aitopia styling */}
        <div className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-purple-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-200/30 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <h3 className="font-semibold text-purple-900 mb-2 text-sm">Looking for something specific?</h3>
            <div className="space-y-1 text-xs text-purple-700">
              <p>• Check the URL for typos</p>
              <p>• Use our search function</p>
              <p>• Browse our main navigation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
