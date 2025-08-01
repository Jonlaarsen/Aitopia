"use client";
import { Tables } from "@/database.types";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import ImageDialog from "./ImageDialog";

type ImageProps = {
  url: string | undefined;
} & Tables<"generated_images">;

interface GalleryProps {
  images: ImageProps[];
}

const GalleryComponent = ({ images }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
  console.log("gallery.tsx", images);

  if (images.length === 0) {
    return (
      <Card className=" w-full max-w-xl 2xl:max-w-2xl bg-zinc-300 text-black">
        <CardContent className="flex aspect-square items-center justify-center p-4">
          <span className="text-2xl">No Images Generated</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="container mx-auto py-8">
      <div className="columns-4 gap-4 space-x-4">
        {images.map((image, index) => (
          <div key={index}>
            <div
              onClick={() => setSelectedImage(image)}
              className="relative group overflow-hidden cursor-pointer transition-transform"
            >
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-70 rounded">
                <div className="flex items-center justify-center h-full">
                  <p className="text-white text-lg font-semibold group-hover:opacity-100">
                    View Details
                  </p>
                </div>
              </div>
              <Image
                src={image.url || ""}
                width={image.width || 0}
                height={image.height || 0}
                alt={image.prompt || "AI generated image"}
                className="object-cover rounded"
              />
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <ImageDialog
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
};

export default GalleryComponent;
