import AuthForm from "@/components/authentication/AuthForm";
import LoginForm from "@/components/authentication/LoginForm";
import { Sparkle } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="h-screen grid grid-cols-1 sm:grid-cols-2 relative">
      <div className="bg-[url('https://images.unsplash.com/photo-1517196084897-498e0abd7c2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover flex items-center justify-center">
        <h1 className="absolute flex gap-2 bottom-5 left-5 text-2xl font-semibold text-white">
          AItopia <Sparkle className="h-7" />
        </h1>
      </div>
      <div className="bg-zinc-100 flex items-center justify-center h-full p-8 w-full">
        <div className="max-w-xl w-[400px] mx-auto">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default page;
