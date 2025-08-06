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
        href="#faqs"
        className=" font-medium hover:underline underline-offset-2"
      >
        Faqs
      </Link>
      <Link
        href="/login?state=signup"
        className=" font-medium hover:underline underline-offset-2"
      >
        <Button size={"sm"}>Sign Up</Button>
      </Link>
    </>
  );
};

const Navbar = () => {
  return (
    <div className="top-0 w-full fixed bg-white/80 shadow-2xl overflow-hidden z-50 py-4 px-8 backdrop-blur-md">
      <header className="container mx-auto items-center justify-between flex">
        <div className="flex items-center justify-between font-bold text-lg">
          <Sparkle className="h-7 w-7 mr-2" />
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
