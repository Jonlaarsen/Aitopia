"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { BadgeInfoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useVideoStore from "@/store/useVideoStore";

export const VideoGeneratorFormSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  duration: z.number().min(5).max(10),
  fps: z.number().min(1).max(60),
  resolution: z.enum(["480p", "1080p"]),
  aspect_ratio: z.enum(["16:9", "9:16", "1:1"]),
  camera_fixed: z.boolean(),
  model: z.string(),
});

const VideoConfigurations = () => {
  const generateVideo = useVideoStore((state) => state.generateVideo);
  const loading = useVideoStore((state) => state.loading);

  const form = useForm<z.infer<typeof VideoGeneratorFormSchema>>({
    resolver: zodResolver(VideoGeneratorFormSchema),
    defaultValues: {
      model: "bytedance/seedance-1-pro",
      prompt: "",
      duration: 5,
      fps: 24,
      resolution: "1080p",
      aspect_ratio: "16:9",
      camera_fixed: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof VideoGeneratorFormSchema>) => {
    await generateVideo(values);
  };

  return (
    <TooltipProvider>
      <fieldset className="border p-4 rounded-xl space-y-6">
        <legend>Settings</legend>
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <div className="space-y-2 ">
              <div className="flex items-center gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <BadgeInfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Choose the duration of your video. Seedance Pro supports 5
                      or 10 seconds.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select
                value={form.watch("duration").toString()}
                onValueChange={(value) =>
                  form.setValue("duration", parseInt(value))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 seconds</SelectItem>
                  <SelectItem value="10">10 seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="resolution">Resolution</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <BadgeInfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Choose video quality. Higher resolution uses more credits.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select
                value={form.watch("resolution")}
                onValueChange={(value) =>
                  form.setValue("resolution", value as "480p" | "1080p")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="480p">480p (1 credits/second)</SelectItem>
                  <SelectItem value="1080p">
                    1080p (4 credits/second)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="aspect_ratio">Aspect Ratio</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <BadgeInfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Choose the video dimensions. 16:9 for landscape, 9:16 for
                      portrait, 1:1 for square.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select
                value={form.watch("aspect_ratio")}
                onValueChange={(value) =>
                  form.setValue(
                    "aspect_ratio",
                    value as "16:9" | "9:16" | "1:1"
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                  <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                  <SelectItem value="1:1">1:1 (Square)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 flex justify-between px-4">
              <div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="fps">FPS</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <BadgeInfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Frames per second. We use 24 FPS for optimal quality.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-sm text-muted-foreground">24 FPS</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="fps">Format</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <BadgeInfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The movie format the video will be generated in.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-sm text-muted-foreground">.MP4</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="camera_fixed">Fixed Camera</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <BadgeInfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Keep the camera stationary during video generation.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Switch
                  id="camera_fixed"
                  checked={form.watch("camera_fixed")}
                  onCheckedChange={(checked) =>
                    form.setValue("camera_fixed", checked)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="prompt">Prompt</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <BadgeInfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Describe what you want to see in the video. Be specific
                      for better results.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Textarea
                className="h-[8rem]"
                id="prompt"
                placeholder="Describe the video you want to generate..."
                {...form.register("prompt")}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Generating..." : "Generate Video"}
            </Button>
          </form>
        </div>
      </fieldset>
    </TooltipProvider>
  );
};

export default VideoConfigurations;
