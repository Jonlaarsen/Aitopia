import AuthForm from "@/components/authentication/AuthForm";
import { Sparkle } from "lucide-react";
import React from "react";

interface SearchParams {
  state?: string;
}

const page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { state } = await searchParams;
  console.log(state);
  return (
    <div className="h-screen grid grid-cols-1 sm:grid-cols-2 relative">
      <div className="hidden sm:block bg-[url('https://images.unsplash.com/photo-1517196084897-498e0abd7c2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover flex items-center justify-center">
        <h1 className="absolute flex gap-2 bottom-5 left-5 text-2xl font-semibold text-white">
          AItopia <Sparkle className="h-7" />
        </h1>
      </div>
      <div className="bg-zinc-100  flex items-center justify-center h-full p-8 w-full">
        <div className="absolute inset-0 sm:hidden  bg-[linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <div className="relative max-w-xl w-[400px] mx-auto">
          <AuthForm state={state ?? "login"} />
        </div>
      </div>
    </div>
  );
};

export default page;
