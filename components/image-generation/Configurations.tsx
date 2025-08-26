"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "../ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BadgeInfoIcon } from "lucide-react";
import useGeneratedStore from "@/store/useGeneratedStore";

export const ImageGeneratorFormSchema = z.object({
  model: z.string({ required_error: "Model is required" }),
  prompt: z.string({ required_error: "Prompt is required" }),
  guidance: z.number({ required_error: "Guidance scale is required" }),
  num_outputs: z.number().min(1, { message: "Number of outputs is required" }),
  aspect_ratio: z.string({ required_error: "Aspect ratio is required" }),
  output_format: z.string({ required_error: "Output format is required" }),
  output_quality: z.number().min(1, { message: "Output quality is required" }),
  num_inference_steps: z
    .number()
    .min(1, { message: "Number of inference steps is required" }),
  seed: z.number().optional(),
  scheduler: z.string().optional(),
  negative_prompt: z.string().optional(),
  style_preset: z.string().optional(),
});

const Configurations = () => {
  const generateImage = useGeneratedStore((state) => state.generateImage);
  const form = useForm<z.infer<typeof ImageGeneratorFormSchema>>({
    resolver: zodResolver(ImageGeneratorFormSchema),
    defaultValues: {
      model: "black-forest-labs/flux-dev",
      prompt: "",
      guidance: 3.5,
      num_outputs: 1,
      aspect_ratio: "1:1",
      output_format: "jpg",
      output_quality: 80,
      num_inference_steps: 28,
    },
  });
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "model") {
        let newSteps;

        if (value.model === "black-forest-labs/flux-schnell") {
          newSteps = 4;
        } else {
          newSteps = 28;
        }
        if (newSteps !== undefined) {
          form.setValue("num_inference_steps", newSteps);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ImageGeneratorFormSchema>) {
    console.log("Form submitted with values:", values);
    await generateImage(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8">
        <fieldset className="border p-4 rounded-xl space-y-6">
          <legend>Settings</legend>

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-start gap-2">
                  <FormLabel>Model</FormLabel>
                  <Tooltip>
                    <TooltipTrigger>
                      <BadgeInfoIcon className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Choose a model.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a model to use." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="black-forest-labs/flux-dev">
                      Flux Dev (Quality)
                    </SelectItem>
                    <SelectItem value="black-forest-labs/flux-schnell">
                      Flux Schnell (Fast)
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="aspect_ratio"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-start gap-2">
                    <FormLabel>Aspect Ratio</FormLabel>
                    <Tooltip>
                      <TooltipTrigger>
                        <BadgeInfoIcon className="h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Choose an aspect ratio for the image.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>{" "}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a ratio to use." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1:1">1:1 (Square)</SelectItem>
                      <SelectItem value="4:3">4:3 (Standard)</SelectItem>
                      <SelectItem value="3:2">3:2 (Classic)</SelectItem>
                      <SelectItem value="16:9">16:9 (Widescreen)</SelectItem>
                      <SelectItem value="16:10">16:10 (Widescreen)</SelectItem>
                      <SelectItem value="21:9">21:9 (Ultrawide)</SelectItem>
                      <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                      <SelectItem value="3:4">3:4 (Portrait)</SelectItem>
                      <SelectItem value="2:3">2:3 (Portrait)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="num_outputs"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-start gap-2">
                    <FormLabel>Number Of Outputs</FormLabel>
                    <Tooltip>
                      <TooltipTrigger>
                        <BadgeInfoIcon className="h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Choose how many images whill be rendered.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={4}
                      placeholder="shadcn"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="guidance"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <div className="flex items-center justify-start gap-2">
                    <FormLabel>Guidance</FormLabel>
                    <Tooltip>
                      <TooltipTrigger>
                        <BadgeInfoIcon className="h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Choose how closely the modal will follow the prompt.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>{" "}
                  <span>{field.value}</span>
                </FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[field.value]}
                    min={0}
                    max={10}
                    step={0.5}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="num_inference_steps"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <div className="flex items-center justify-start gap-2">
                    <FormLabel>Number of Inference Steps</FormLabel>
                    <Tooltip>
                      <TooltipTrigger>
                        <BadgeInfoIcon className="h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Choose how many steps the modal should take to finish
                          the image.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>{" "}
                  <span>{field.value}</span>
                </FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[field.value]}
                    min={1}
                    max={
                      form.getValues("model") ===
                      "black-forest-labs/flux-schnell"
                        ? 4
                        : 50
                    }
                    step={1}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="output_quality"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <div className="flex items-center justify-start gap-2">
                    <FormLabel>Output Quality</FormLabel>
                    <Tooltip>
                      <TooltipTrigger>
                        <BadgeInfoIcon className="h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Choose the quality of the rendered images.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>{" "}
                  <span>{field.value}</span>
                </FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[field.value]}
                    min={50}
                    max={100}
                    step={1}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="output_format"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-start gap-2">
                  <FormLabel>Output Formast</FormLabel>
                  <Tooltip>
                    <TooltipTrigger>
                      <BadgeInfoIcon className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Choose the format of the rendered images.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an image format." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="jpg">JPG (Compressed)</SelectItem>
                    <SelectItem value="jpeg">JPEG (High Quality)</SelectItem>
                    <SelectItem value="png">PNG (Lossless)</SelectItem>
                    <SelectItem value="webp">WebP (Modern)</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-start gap-2">
                  <FormLabel>Prompt</FormLabel>
                  <Tooltip>
                    <TooltipTrigger>
                      <BadgeInfoIcon className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Write what you want to be rendered in the image.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter your prompt here..."
                    className="h-[8rem]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            Generate Image
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default Configurations;
