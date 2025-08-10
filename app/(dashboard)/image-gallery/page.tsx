import { getImages } from "@/app/actions/image-actions";
import GalleryComponent from "@/components/gallery/GalleryComponent";
import React from "react";

const page = async () => {
  const { data: images } = await getImages();
  console.log("page.tsx", images);
  return (
    <section className="container mx-auto">
      <h1 className="text-3xl font-bold mb-2">My Images</h1>
      <p className="text-zinc-700 text-sm mb-6">
        Here you can see all the images you have made. Click on an image to view
        details.
      </p>
      <GalleryComponent
        images={(images || []).filter(
          (img): img is typeof img & { url: string } =>
            typeof img.url === "string"
        )}
      />
    </section>
  );
};

export default page;
