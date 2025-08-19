"use client";
import { Button } from "@/components/ui/button";
import {
  Home,
  ArrowLeft,
  Search,
  AlertTriangle,
  Sparkles,
  Zap,
  Aperture,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 relative overflow-hidden">
      <div className="w-full  max-w-md text-center relative z-10">
        {/* 404 Number with Aitopia styling */}
        <div>
          <div className="flex items-center justify-center font-bold text-xl mb-10">
            <div className="bg-gradient-to-b from-purple-600 to-pink-400 p-3 rounded-full mr-2">
              <Aperture strokeWidth={2} className="h-10 w-10 text-white" />
            </div>

            <h1 className="text-7xl font-extrabold leading-tight ">
              <span className="italic">H</span>Ai
              <span className="italic">VEN</span>
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-to-br from-purple-600 to-pink-400 rounded-full flex items-center justify-center shadow-xl relative">
              <AlertTriangle className="w-12 h-12 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
            </div>
          </div>

          <h2 className="text-2xl font-bold bg-gradient-to-r from-black to-zinc-900 bg-clip-text text-transparent">
            Page Not Found
          </h2>

          <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might
            have been moved, deleted or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons with Aitopia styling */}
        <div className="space-y-3">
          <Button
            onClick={() => router.back()}
            className="w-full bg-gradient-to-r from-black to-zinc-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 border-0 text-sm py-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full border-purple-300 hover:bg-purple-50 text-purple-700 hover:text-purple-800 text-sm py-2"
          >
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
            <h3 className="font-semibold text-purple-900 mb-2 text-sm">
              Looking for something specific?
            </h3>
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
