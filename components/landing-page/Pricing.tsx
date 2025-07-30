"use client";
import React, { useState } from "react";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Tables } from "@/database.types";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Product = Tables<"products">;
type Price = Tables<"prices">;

interface ProductWithPrices extends Product {
  prices: Price[];
}

interface PricingProps {
  products: ProductWithPrices[];
  mostPopularProduct?: string;
}

const Pricing = ({ products, mostPopularProduct = "pro" }: PricingProps) => {
  const [billingInterval, setBillingInterval] = useState("month");
  console.log(products);
  return (
    <section className="w-full  bg-zinc-200 flex flex-col items-center justify-center">
      <div className="w-full container mx-auto py-32 flex flex-col items-center justify-center space-y-6">
        <div className="text-center flex flex-col items-center justify-center">
          <AnimatedGradientText>
            <span>Pricing</span>
          </AnimatedGradientText>

          <h1 className="text-3xl font-bold text-zinc-700 mt-8">
            Choose the plan that fits your needs.
          </h1>
          <p className="text-sm text-zinc-600">
            Choose an affordable plan that is packed with the best features for
            you or your audience
          </p>
        </div>
        <div className="flex items-center justify-center space-x-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 place-items-center mx-auto gap-6">
          {products.map((product) => {
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
                  "border bg-white rounded-2xl shadow-sm h-fit divide-border  divide-y",
                  product.name?.toLowerCase() ===
                    mostPopularProduct.toLowerCase()
                    ? "border-black scale-102 shadow-md"
                    : "border-zinc-200"
                )}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold leading-6 flex items-center justify-between">
                    {product.name}
                    {product.name?.toLowerCase() === "pro" ? (
                      <Badge className="border font-semibold rounded-full bg-zinc-900 text-white">
                        Most Popular
                      </Badge>
                    ) : null}
                  </h2>
                  <p className="text-zinc-600 mt-4 text-sm">
                    {product.description}
                  </p>
                  <p className="mt-8">
                    <span className="text-3xl font-bold ">{priceString}</span>
                    <span className="text-base text-zinc-700 font-medium">
                      / {billingInterval}
                    </span>
                  </p>
                  <Link href="/login?state=signup">
                    <Button
                      className="mt-8 w-full font-semibold border-2 border-black/50"
                      variant={
                        product.name?.toLowerCase() ===
                        mostPopularProduct.toLowerCase()
                          ? "default"
                          : "secondary"
                      }
                    >
                      Subscribe
                    </Button>
                  </Link>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h3 className="uppercase tracking-wide text-black font-medium text-sm ">
                    What's included?
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {Object.values(product.metadata || {}).map(
                      (feature, index) => {
                        if (feature) {
                          return (
                            <li className="flex space-x-2" key={index}>
                              <Check className="h-5 w-5 text-black" />
                              <span className="text-zinc-800">{feature}</span>
                            </li>
                          );
                        }
                      }
                    )}
                  </ul>
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
