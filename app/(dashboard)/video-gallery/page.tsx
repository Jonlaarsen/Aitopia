import VideoGalleryComponent from "@/components/video-gallery/VideoGalleryComponent";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Video Gallery</h1>
      <VideoGalleryComponent />
    </div>
  );
};

export default page;
