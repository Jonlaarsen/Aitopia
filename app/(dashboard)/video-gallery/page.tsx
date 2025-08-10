import VideoGalleryComponent from "@/components/video-gallery/VideoGalleryComponent";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">My Images</h1>
      <p className="text-zinc-700 text-sm mb-6">
        Here you can see all the videos you have made. Click on a video to view
        details.
      </p>
      <VideoGalleryComponent />
    </div>
  );
};

export default page;
