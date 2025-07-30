import PlanSummary from "@/components/billing/PlanSummary";
import { getProducts, getSubscription, getUser } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const supabase = await createClient();

  const [user, products, subscription] = await Promise.all([
    getUser(supabase), // gets the current auth user
    getProducts(supabase),
    getSubscription(supabase),
  ]); // gets all the active products and details
  if (!user) {
    return redirect("/login");
  }
  return (
    <section className="container mx-auto space-y-8">
      <div>
        <h1 className="text-5xl font-bold tracking-tight">Plans & Billing</h1>
        <p className="text-zinc-700 text-sm mt-3">
          Manage your subscriptions and billing information
        </p>
      </div>
      <div className="grid gap-10">
        <PlanSummary
          subscription={subscription}
          user={user}
          products={products || []}
        />
      </div>
    </section>
  );
};

export default page;
