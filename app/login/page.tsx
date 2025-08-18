import AuthForm from "@/components/authentication/AuthForm";
import { Aperture, Sparkle } from "lucide-react";
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
      <div className="hidden h-full w-full sm:flex  bg-cover  items-center justify-center bg-[url('https://i.pinimg.com/originals/d8/e6/eb/d8e6eb6b345ada088e2448947c483ab4.gif')]">
        <div className="flex items-center justify-center text-7xl font-semibold text-white">
          <Aperture className="h-[5rem] w-[5rem]" />
          <h1 className="text-7xl font-extrabold leading-tight ">
            <span className="italic">H</span>Ai
            <span className="italic">VEN</span>
          </h1>
        </div>
      </div>
      <div className="bg-gradient-to-b from-zinc-100 via-zinc-200 to-purple-300  flex items-center justify-center h-full p-8 w-full">
        <div className="absolute inset-0 sm:hidden  bg-[linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="relative max-w-xl w-[400px] mx-auto">
          <div className="flex sm:hidden mb-10 items-center justify-center text-2xl font-semibold text-black">
            <Aperture className="h-[3rem] w-[3rem]" />
            <h1 className="text-3xl font-extrabold leading-tight ">
              <span className="italic">H</span>Ai
              <span className="italic">VEN</span>
            </h1>
          </div>
          <AuthForm state={state ?? "login"} />
        </div>
      </div>
    </div>
  );
};

export default page;
