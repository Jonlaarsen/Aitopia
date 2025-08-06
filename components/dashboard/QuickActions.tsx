import React from "react";

import { Button } from "../ui/button";
import Link from "next/link";
import { CreditCard, Image, Wand2Icon } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="space-y-0  h-full w-full">
      <div className="flex flex-col  gap-2">
        <Button asChild className="w-full">
          <Link href={"/image-generation"}>
            <Wand2Icon className="h-4 w-4 mr-2" />
            Generate image
          </Link>
        </Button>
        <Button asChild variant={"outline"} className="w-full">
          <Link href={"/image-gallery"}>
            <Image className="h-4 w-4 mr-2" />
            View Gallery
          </Link>
        </Button>
        <Button asChild variant={"outline"} className="w-full">
          <Link href={"/billing"}>
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
