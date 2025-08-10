import { Menu, Sparkle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

const NavItems = () => {
  return (
    <>
      <Link
        href="#features"
        className=" font-medium hover:underline underline-offset-2"
      >
        Features
      </Link>
      <Link
        href="#pricing"
        className=" font-medium hover:underline underline-offset-2"
      >
        Pricing
      </Link>
      <Link
        href="#faq"
        className=" font-medium hover:underline underline-offset-2"
      >
        FAQ
      </Link>
      <Link
        href="/login?state=signup"
        className=" font-medium hover:underline underline-offset-2"
      >
        <Button variant={"outline"} size={"sm"}>
          get started
        </Button>
      </Link>
      <Link
        href="/login
        "
        className=" font-medium hover:underline underline-offset-2"
      >
        <Button size={"sm"}>Login</Button>
      </Link>
    </>
  );
};

const Navbar = () => {
  return (
    <div className="top-0 w-full fixed bg-white/80 shadow-2xl overflow-hidden z-50 py-4 px-8 backdrop-blur-md">
      <header className="container mx-auto items-center justify-between flex">
        <div className="flex items-center justify-between font-bold text-lg">
          <div className="bg-gradient-to-b from-purple-600 to-pink-400 p-2 rounded-2xl mr-2">
            <Sparkle className="h-7 w-7 text-white" />
          </div>

          <span>AItopia</span>
        </div>
        <nav className="md:flex hidden justify-center items-center ml-auto space-x-4 text-sm">
          <NavItems />
        </nav>
        {/* Mobile Navbar */}
        <div className="ml-auto md:hidden overflow-hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="h-6 w-6" strokeWidth={2} />
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav className="flex items-end justify-end px-4 w-full flex-col gap-4 mt-16 text-lg">
                <NavItems />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
