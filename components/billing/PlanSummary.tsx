import { Tables } from "@/database.types";
import { User } from "@supabase/supabase-js";
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import PricingSheet from "./PricingSheet";

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
interface PlanSummaryProps {
  subscription: SubrscriptionWithProducts | null;
  user: User | null;
  products: ProductWithPrices[] | null;
}

const PlanSummary = ({ subscription, user, products }: PlanSummaryProps) => {
  if (!subscription || subscription.status !== "active") {
    return (
      <Card className="max-w-5xl">
        <CardContent className="px-5 py-4">
          <h3 className="text-xl font-semibold flex flex-wrap items-center space-x-4 mb-6">
            <span>Plan Summary</span>
            <Badge
              className="rounded-full font-bold bg-zinc-200"
              variant="secondary"
            >
              No Plan
            </Badge>
          </h3>
          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-5 flex flex-col pr-12">
              <div className="flex-1 text-sm flex w-full justify-between items-center pb-2">
                <span className="font-bold">Credits left: </span>
                <span>0 remaining</span>
              </div>
              <div>
                <Progress value={0} className="w-full h-2" />
              </div>
            </div>
            <div className=""></div>
          </div>
        </CardContent>
        <CardFooter className="border-t flex justify-end space-x-4 ">
          <span>
            <button className="text-zinc-500 hover:text-zinc-800 text-sm">
              Learn more
            </button>
          </span>
          <span>
            <PricingSheet
              user={user}
              products={products ?? []}
              subscription={subscription}
            />
          </span>
        </CardFooter>
      </Card>
    );
  }
  return <div></div>;
};

export default PlanSummary;
