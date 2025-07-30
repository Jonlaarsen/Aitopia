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
import SheetPricing from "./Pricing";

type Product = Tables<"products">;
type Price = Tables<"prices">;
type Subscription = Tables<"subscriptions">;

interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProducts extends Price {
  products: Product | null;
}

interface SubrscriptionWithProducts extends Subscription {
  prices: PriceWithProducts | null;
}
interface PricingSheetProps {
  subscription: SubrscriptionWithProducts | null;
  user: User | null;
  products: ProductWithPrices[] | null;
}

const PricingSheet = ({ user, products, subscription }: PricingSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button>Upgrade</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">
            Change subscription plan.
          </SheetTitle>
          <SheetDescription>
            Choose a plan that fits your needs and budget to continue using our
            service.
          </SheetDescription>
        </SheetHeader>
        <SheetPricing
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
