"use client";
import React from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
  resolution: z.enum(["480p", "720p", "1080p"]),
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

  const selectedModel = form.watch("model");
  const isVeo3Fast = selectedModel === "google/veo-3-fast";

  // Auto-set duration to 8 when Veo 3 Fast is selected
  React.useEffect(() => {
    if (isVeo3Fast) {
      form.setValue("duration", 8);
    }
  }, [isVeo3Fast, form]);

  // Auto-set resolution to 1080p when Veo 3 Fast is selected (since 480p is not supported)
  React.useEffect(() => {
    if (isVeo3Fast && form.watch("resolution") === "480p") {
      form.setValue("resolution", "1080p");
    }
  }, [isVeo3Fast, form]);

  const onSubmit = async (values: z.infer<typeof VideoGeneratorFormSchema>) => {
    await generateVideo(values);
  };

  return (
    <TooltipProvider>
      <fieldset className="border p-4 rounded-xl space-y-6">
        <legend>Settings</legend>
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            {/* Model Selection */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="model">Model</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <BadgeInfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Choose your video generation model. Different models have
                      different credit costs.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select
                value={form.watch("model")}
                onValueChange={(value) => form.setValue("model", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bytedance/seedance-1-pro">
                    Seedance Pro
                  </SelectItem>
                  <SelectItem value="google/veo-3-fast">
                    Google Veo 3 Fast
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Duration - show different options based on model */}
            <div className="space-y-2 ">
              <div className="flex items-center gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <BadgeInfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {isVeo3Fast
                        ? "Veo 3 Fast videos are fixed at 8 seconds."
                        : "Choose the duration of your video. Seedance Pro supports 5 or 10 seconds."}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select
                value={form.watch("duration").toString()}
                onValueChange={(value) =>
                  form.setValue("duration", parseInt(value))
                }
                disabled={isVeo3Fast}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {isVeo3Fast ? (
                    <SelectItem value="8">
                      8 seconds (Veo 3 Fast only)
                    </SelectItem>
                  ) : (
                    <>
                      <SelectItem value="5">5 seconds</SelectItem>
                      <SelectItem value="10">10 seconds</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Resolution - show different options based on model */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="resolution">Resolution</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <BadgeInfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {isVeo3Fast
                        ? "Choose video quality. Veo 3 Fast costs 40 credits regardless of resolution."
                        : "Choose video quality. Higher resolution uses more credits."}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select
                value={form.watch("resolution")}
                onValueChange={(value) =>
                  form.setValue(
                    "resolution",
                    value as "480p" | "720p" | "1080p"
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {isVeo3Fast ? (
                    <>
                      <SelectItem value="720p">720p</SelectItem>
                      <SelectItem value="1080p">1080p</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="480p">
                        480p (1 credits/second)
                      </SelectItem>
                      <SelectItem value="1080p">
                        1080p (4 credits/second)
                      </SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Aspect Ratio */}
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

            {/* FPS and Format */}
            {!isVeo3Fast && (
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
                        <p>
                          Keep the camera stationary during video generation.
                        </p>
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
            )}

            {/* Prompt */}
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

            {/* Credit Information Card */}
            <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
              <h4 className="font-medium text-sm mb-2">Credit Costs</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                {isVeo3Fast ? (
                  <div className="flex items-center justify-between">
                    <span>Google Veo 3 Fast:</span>
                    <span className="font-medium">40 credits per video</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <span>Seedance Pro 480p:</span>
                      <span className="font-medium">{form.watch("duration")} credits</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Seedance Pro 1080p:</span>
                      <span className="font-medium">{form.watch("duration") * 4} credits</span>
                    </div>
                  </>
                )}
                <div className="text-xs text-muted-foreground mt-2">
                  {isVeo3Fast 
                    ? "Veo 3 Fast videos are always 8 seconds and cost 40 credits regardless of resolution."
                    : "Seedance Pro costs vary by duration and resolution. 480p = 1 credit/second, 1080p = 4 credits/second."
                  }
                </div>
              </div>
            </div>
          </form>
        </div>
      </fieldset>
    </TooltipProvider>
  );
};

export default VideoConfigurations;
