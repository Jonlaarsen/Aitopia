import Features from "@/components/landing-page/Features";
import FAQ from "@/components/landing-page/FAQ";
import Footer from "@/components/landing-page/Footer";
import HeroSection from "@/components/landing-page/HeroSection";
import Navbar from "@/components/landing-page/Navbar";
import Pricing from "@/components/landing-page/Pricing";
import Examples from "@/components/landing-page/Examples";
import { getProducts, getUser } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const [user, products] = await Promise.all([
    getUser(supabase), // gets the current auth user
    getProducts(supabase), // gets all the active products and details
  ]);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Navbar />
      <HeroSection />
      <Features />
      <Examples />
      <Pricing products={products ?? []} />
      <FAQ />
      <Footer />
    </main>
  );
}
