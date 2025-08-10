import { Tables } from "@/database.types";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface RecentImagesProps {
  images: Array<Tables<"generated_images"> & { url?: string }>;
}

const RecentImages = ({ images }: RecentImagesProps) => {
  if (images.length === 0) {
    return (
      <Card className=" w-full col-span-3 bg-zinc-100 text-black">
        <CardHeader>
          <CardTitle>Recent Generations</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-4">
          <span className="text-xl">No Images Generated yet!</span>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="col-span-4  bg-zinc-100 text-black">
      <CardHeader>
        <CardTitle>Recent Generations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Carousel className="w-full ">
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem
                key={image.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="space-y-2">
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-lg",
                      image.height && image.width
                        ? `aspect-[${image.width}/${image.height}]`
                        : `aspect-square`
                    )}
                  >
                    <Image
                      width={image.width || 100}
                      height={image.height || 100}
                      className="object-cover"
                      src={image.url || ""}
                      alt={image.prompt || "AI generated image"}
                    />
                  </div>
                  <Badge className="text-xs font-medium line-clamp-2 ">
                    Prompt: {image.prompt}
                  </Badge>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
        <div className="flex justify-end">
          <Link href={"/image-gallery"}>
            <Button variant={"ghost"} size={"sm"}>
              Go to gallery <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentImages;
