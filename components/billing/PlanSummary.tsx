import { Tables } from "@/database.types";
import { User } from "@supabase/supabase-js";
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import PricingSheet from "./PricingSheet";
import { format, formatDate } from "date-fns";

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
interface PlanSummaryProps {
  subscription: SubscriptionWithProducts | null;
  user: User | null;
  products: ProductWithPrices[] | null;
  credits: Tables<"credits"> | null;
}

const PlanSummary = ({
  credits,
  subscription,
  user,
  products,
}: PlanSummaryProps) => {
  if (!credits || !subscription || subscription.status !== "active") {
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
  console.log(subscription);

  const {
    products: subscriptionProduct,
    unit_amount,
    currency,
  } = subscription?.prices ?? {};
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency!,
    minimumFractionDigits: 0,
  }).format((unit_amount || 0) / 100);

  const imageGenCounter = credits.image_generation_count ?? 0;
  const maxImageGenCounter = credits.max_image_generation_count ?? 0;

  return (
    <div>
      <Card className="max-w-5xl">
        <CardContent className="px-5 py-4">
          <h3 className="text-xl font-semibold flex flex-wrap items-center space-x-4 mb-6">
            <span>Plan Summary</span>
            <Badge
              className="rounded-full font-bold bg-zinc-200"
              variant="secondary"
            >
              {subscriptionProduct?.name} Plan
            </Badge>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-8 gap-4">
            <div className="sm:col-span-5 flex flex-col pr-12">
              <div className="flex-1 text-sm flex w-full justify-between items-center pb-2 px-2">
                <span className="font-bold">
                  {imageGenCounter}/{maxImageGenCounter}
                </span>
                <span className="text-zinc-500">Available Credits</span>
              </div>
              <div>
                <Progress
                  value={(imageGenCounter / maxImageGenCounter) * 100}
                  className="w-full h-2"
                />
              </div>
            </div>
            <div className="sm:col-span-3 flex flex-col space-y-4 sm:flex-row justify-between flex-wrap">
              <div className="flex flex-col pb-0">
                <div className="text-sm font-normal">Price/Month</div>
                <div className="flex-1 pt-1 text-sm font-medium">
                  {priceString}
                </div>
              </div>
              <div className="flex flex-col pb-0">
                <div className="text-sm font-normal">Included Credits</div>
                <div className="flex-1 pt-1 text-sm font-medium">
                  {maxImageGenCounter}
                </div>
              </div>
              <div className="flex flex-col pb-0">
                <div className="text-sm font-normal">Renewal Date</div>
                <div className="flex-1 pt-1 text-sm font-medium">
                  {formatDate(
                    new Date(subscription.current_period_end),
                    "MMM d, yyyy"
                  )}
                </div>
              </div>
            </div>
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
    </div>
  );
};

export default PlanSummary;
