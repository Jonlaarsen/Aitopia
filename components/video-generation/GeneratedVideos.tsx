"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useVideoStore from "@/store/useVideoStore";

const GeneratedVideos = () => {
  const { videos, loading: isLoading } = useVideoStore();

  if (videos.length === 0) {
    return (
      <Card className="w-full max-w-xl 2xl:max-w-2xl bg-zinc-100 text-black">
        <CardContent className="flex aspect-video items-center justify-center p-4">
          <span className="text-2xl">No Videos Generated</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Carousel className="w-full max-w-xl 2xl:max-w-2xl">
        <CarouselContent>
          {videos.map((video, index) => (
            <CarouselItem key={index}>
              <div className="flex items-center justify-center aspect-video rounded-lg overflow-hidden">
                <video
                  className="object-cover object-center w-full h-full"
                  controls
                  src={video.url}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default GeneratedVideos; 