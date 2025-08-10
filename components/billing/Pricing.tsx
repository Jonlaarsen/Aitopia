"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Tables } from "@/database.types";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { checkoutWithStripe, createStripePortal } from "@/lib/stripe/server";
import { getErrorRedirect } from "@/lib/helpers";
import { getStripe } from "@/lib/stripe/client";
import { toast } from "sonner";

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

interface PricingProps {
  subscription: SubscriptionWithProducts | null;
  user: User | null;
  products: ProductWithPrices[] | null;
  mostPopularProduct?: string;
  showInterval?: boolean;
  activeProduct?: string;
}
const renderPricingButton = ({
  subscription,
  user,
  product,
  price,
  mostPopularProduct,
  handleStripeCheckout,
  handleStripePortalRequest,
}: {
  subscription: SubscriptionWithProducts | null;
  user: User | null;
  product: ProductWithPrices;
  price: Price;
  mostPopularProduct: string;
  handleStripeCheckout: (price: Price) => Promise<void>;
  handleStripePortalRequest: () => Promise<void>;
}) => {
  // case 1: user has active sub for this product
  if (
    user &&
    subscription &&
    subscription.prices?.products?.name?.toLowerCase() ===
      product.name?.toLowerCase()
  ) {
    return (
      <span>
        <Button
          className="mt-8 w-full font-semibold"
          variant={"default"}
          onClick={() => handleStripePortalRequest()}
        >
          Manage Subscription
        </Button>
      </span>
    );
  }
  // case 2: if a user has an active sub for another product
  if (user && subscription) {
    return (
      <span>
        <Button
          className="mt-8 w-full font-semibold"
          variant={"outline"}
          onClick={() => handleStripePortalRequest}
        >
          Switch Plans
        </Button>
      </span>
    );
  }
  // case 3: when a user is logged in with no subs
  if (user && !subscription) {
    return (
      <span>
        <Button
          className="mt-8 w-full font-semibold"
          variant={
            product.name?.toLowerCase() === mostPopularProduct.toLowerCase()
              ? "default"
              : "outline"
          }
          onClick={() => handleStripeCheckout(price)}
        >
          Subscribe
        </Button>
      </span>
    );
  }
  return (
    <span>
      <Button
        className="mt-8 w-full font-semibold"
        variant={
          product.name?.toLowerCase() === mostPopularProduct.toLowerCase()
            ? "default"
            : "outline"
        }
        onClick={() => handleStripeCheckout(price)}
      >
        Subscribe
      </Button>
    </span>
  );
};

const Pricing = ({
  user,
  products,
  mostPopularProduct = "",
  subscription,
  showInterval = true,
  activeProduct = "",
}: PricingProps) => {
  const [billingInterval, setBillingInterval] = useState("month");
  const router = useRouter();
  const currentPath = usePathname();

  console.log(products);
  3;

  const handleStripeCheckout = async (price: Price) => {
    // console.log("handle strip checkout function", price);
    if (!user) {
      return router.push("/login");
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    );
    if (errorRedirect) {
      return router.push(errorRedirect);
    }
    if (!sessionId) {
      return router.push(
        getErrorRedirect(
          currentPath,
          "An unknown error occured, please try again later or contact us."
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });
  };

  const handleStripePortalRequest = async () => {
    toast.info("Redirecting to stripe portal...");
    const redirectUrl = await createStripePortal(currentPath);
    console.log(redirectUrl);
    return router.push(redirectUrl);
  };

  return (
    <section className="w-full max-w-9xl bg-zinc-50 rounded-2xl border border-zinc-300 flex p-2 overflow-y-auto flex-col items-center justify-center">
      {showInterval && (
        <div className="flex items-center justify-center space-x-4 pt-[12rem]">
          <Label htmlFor="pricing-switch" className="font-semibold text-base">
            Monthly
          </Label>
          <Switch
            id="pricing-switch"
            checked={billingInterval === "year"}
            onCheckedChange={(checked) =>
              setBillingInterval(checked ? "year" : "month")
            }
          />
          <Label htmlFor="pricing-switch" className="font-semibold text-base">
            Yearly
          </Label>
        </div>
      )}
      <div className="w-full container mx-auto py-10 flex flex-col items-center justify-center space-y-6">
        <div className="flex flex-wrap px-4  place-items-center mx-auto gap-6">
          {products?.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            if (!price) return null;

            const priceString = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: price.currency!,
              minimumFractionDigits: 0,
            }).format((price?.unit_amount || 0) / 100);

            return (
              <div
                key={product.id}
                className={cn(
                  "border bg-white max-w-[21rem] h-[18rem]  rounded-2xl shadow-sm  divide-border  divide-y",
                  product.name?.toLowerCase() === activeProduct.toLowerCase()
                    ? "border-black scale-102 shadow-md"
                    : "border-zinc-200"
                )}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold leading-6 flex items-center justify-between">
                    {product.name}
                    {product.name?.toLowerCase() ===
                    activeProduct.toLowerCase() ? (
                      <Badge className="border font-semibold rounded-full bg-zinc-900 text-white">
                        Selected
                      </Badge>
                    ) : null}
                    {product.name?.toLowerCase() ===
                    mostPopularProduct.toLowerCase() ? (
                      <Badge className="border font-semibold rounded-full bg-purple-600 text-white">
                        Most Popular
                      </Badge>
                    ) : null}
                  </h2>
                  <p className="text-zinc-600 mt-4 min-h-14 text-sm">
                    {product.description}
                  </p>
                  <p className="mt-8">
                    <span className="text-3xl font-bold ">{priceString}</span>
                    <span className="text-base text-zinc-700 font-medium">
                      / {billingInterval}
                    </span>
                  </p>

                  {renderPricingButton({
                    subscription,
                    user,
                    product,
                    price,
                    mostPopularProduct,
                    handleStripeCheckout,
                    handleStripePortalRequest,
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
