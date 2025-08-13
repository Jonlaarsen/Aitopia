"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ConfirmEmailPage() {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 relative overflow-hidden">
      {/* Aitopia Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-200/10 to-blue-200/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md relative overflow-hidden">
          {/* Aitopia Branding */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-2xl"></div>

          <CardHeader className="text-center space-y-4 pb-6 relative">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl relative">
              <Mail className="w-8 h-8 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Check Your Email
                </CardTitle>
                <Sparkles className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-gray-600 text-base">
                We&apos;ve sent you a confirmation email
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 px-6 pb-6">
            <div className="text-center space-y-3">
              <p className="text-gray-700 text-sm leading-relaxed">
                Please check your inbox and click the confirmation link to
                complete your registration.
              </p>

              {/* Timer with Aitopia styling */}
              <div className="flex items-center justify-center space-x-2 text-xs text-purple-600 bg-purple-50 px-3 py-2 rounded-full border border-purple-200">
                <Clock className="w-3 h-3" />
                <span className="font-medium">
                  Time elapsed: {formatTime(timeElapsed)}
                </span>
              </div>
            </div>

            {/* Help section with Aitopia colors */}
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-200/30 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-purple-600" />
                    <h4 className="font-semibold text-purple-900 text-sm">
                      Didn&apos;t receive the email?
                    </h4>
                  </div>
                  <ul className="text-xs text-purple-800 space-y-1">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-purple-600" />
                      <span>Check your spam/junk folder</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-purple-600" />
                      <span>Verify you entered the correct email address</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-purple-600" />
                      <span>Wait a few minutes for delivery</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action buttons with Aitopia styling */}
            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 border-0 text-sm py-2"
              >
                <Link href="/login">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Link>
              </Button>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Need help?{" "}
                  <Link
                    href="/contact"
                    className="text-purple-600 hover:text-purple-700 font-medium underline"
                  >
                    Contact Support
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
