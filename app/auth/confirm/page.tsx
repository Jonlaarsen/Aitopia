"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 relative overflow-hidden">
      {/* Aitopia Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-200/10 to-blue-200/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md relative overflow-hidden">
          {/* Aitopia Branding */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-2xl"></div>
          
          <CardHeader className="text-center space-y-6 pb-8 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl relative">
              <Mail className="w-12 h-12 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="w-6 h-6 text-purple-500" />
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Check Your Email!
                </CardTitle>
                <Sparkles className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-gray-600 text-lg">
                We've sent you a confirmation email. Please check your inbox and click the link to verify your account.
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8 px-8 pb-8">
            <div className="text-center space-y-4">
              <p className="text-gray-700 leading-relaxed">
                We've sent a verification link to your email address. Please check your inbox (and spam folder) and click the link to complete your registration.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 text-blue-700">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Verification email sent</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-4">
              <Button asChild className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 border-0">
                <Link href="/login">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Go to Login
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full border-purple-300 hover:bg-purple-50 text-purple-700 hover:text-purple-800">
                <Link href="/">
                  <Mail className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Need help? <Link href="/contact" className="text-green-600 hover:text-green-700 font-medium underline">Contact Support</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
