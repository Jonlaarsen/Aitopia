import Configurations from "@/components/image-generation/Configurations";
import GeneratedImages from "@/components/image-generation/GeneratedImages";
import React from "react";

const page = () => {
  return (
    <section className="w-full h-full  mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-hidden">
      <Configurations />
      <div className="col-span-2 p-4 rounded-xl flex items-center justify-center ">
        <GeneratedImages />
      </div>
    </section>
  );
};

export default page;
