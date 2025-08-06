import VideoConfigurations from "@/components/video-generation/VideoConfigurations";
import GeneratedVideos from "@/components/video-generation/GeneratedVideos";
import React from "react";

const page = () => {
  return (
    <section className="container mx-auto grid grid-cols-3 gap-4 overflow-hidden">
      <VideoConfigurations />
      <div className="col-span-2 p-4 rounded-xl flex items-center justify-center">
        <GeneratedVideos />
      </div>
    </section>
  );
};

export default page;
