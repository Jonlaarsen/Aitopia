import Configurations from "@/components/image-generation/Configurations";
import React from "react";

const page = () => {
  return (
    <section className="container mx-auto grid grid-cols-3 gap-4 overflow-hidden">
      <Configurations />
      <div className="col-span-2 p-4 rounded-xl flex items-center justify-center bg-gray-100">
        images
      </div>
    </section>
  );
};

export default page;
