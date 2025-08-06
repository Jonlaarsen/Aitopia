import { Tables } from "@/database.types";
import { User } from "@supabase/supabase-js";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import Pricing from "./Pricing";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";

type Product = Tables<"products">;
type Price = Tables<"prices">;
type Subscription = Tables<"subscriptions">;

interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProducts extends Price {
  products: Product | null;
}

interface SubscriptionWithProducts extends Subscription {
  prices: PriceWithProducts | null;
}
interface PricingSheetProps {
  subscription: SubscriptionWithProducts | null;
  user: User | null;
  products: ProductWithPrices[] | null;
}

const PricingSheet = ({ user, products, subscription }: PricingSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span>
          <Button>Upgrade</Button>
        </span>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-center items-center">
        <SheetHeader className="border-b border-zinc-400">
          <SheetTitle className="text-2xl font-bold">
            Change subscription plan.
          </SheetTitle>
          <SheetDescription>
            Choose a plan that fits your needs and budget to continue using our
            service.
          </SheetDescription>
        </SheetHeader>
        <AnimatedGradientText>
          <span>Periods</span>
        </AnimatedGradientText>
        <Pricing
          showInterval={true}
          user={user}
          products={products ?? []}
          subscription={subscription}
          mostPopularProduct="pro"
        />
      </SheetContent>
    </Sheet>
  );
};

export default PricingSheet;
