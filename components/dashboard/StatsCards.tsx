import { Database } from "@/database.types";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CirclePoundSterling, ImageIcon } from "lucide-react";
import QuickActions from "./QuickActions";

interface StatsCardsProps {
  imageCount: number;
  credits: Database["public"]["Tables"]["credits"]["Row"] | null;
}

const StatsCards = ({ imageCount, credits }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 pr-10  gap-6  ">
      <div className="flex items-center justify-start">
        <Card className="space-y-0 max-w-[25rem] w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">Total Images</CardTitle>
            <ImageIcon className="h-5 w-5 text-zinc-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{imageCount}</div>
            <p className="text-xs text-zinc-500">Images generated so far.</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center justify-start">
        <Card className="space-y-0 max-w-[25rem] w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">
              Generation Credits
            </CardTitle>
            <CirclePoundSterling className="h-5 w-5 text-zinc-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {credits?.image_generation_count || 0}/
              {credits?.max_image_generation_count || 0}
            </div>
            <p className="text-xs text-zinc-500">
              Available generation credits.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center justify-center">
        <QuickActions />
      </div>
    </div>
  );
};

export default StatsCards;
