"use client";
import React from "react";
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
import { generateImageAction } from "@/app/actions/image-actions";

/* 
{
  "prompt": "black forest gateau cake spelling out the words \"FLUX DEV\", tasty, food photography, dynamic shot",
  "go_fast": true,
  "guidance": 3.5,
  "megapixels": "1",
  "num_outputs": 1,
  "aspect_ratio": "1:1",
  "output_format": "webp",
  "output_quality": 80,
  "prompt_strength": 0.8,
  "num_inference_steps": 28
}
*/

export const ImageGeneratorFormSchema = z.object({
  model: z.string({ error: "Model is required" }),
  prompt: z.string({ error: "Prompt is required" }),
  guidance: z.number({ error: "Guidance scale is required" }),
  num_outputs: z.number().min(1, { message: "Number of outputs is required" }),
  aspect_ratio: z.string({ error: "Aspect ratio is required" }),
  output_format: z.string({ error: "Output format is required" }),
  output_quality: z.number().min(1, { message: "Output quality is required" }),
  num_inference_steps: z
    .number()
    .min(1, { message: "Number of inference steps is required" }),
});

const Configurations = () => {
  const form = useForm<z.infer<typeof ImageGeneratorFormSchema>>({
    resolver: zodResolver(ImageGeneratorFormSchema),
    defaultValues: {
      model: "black-forest-labs/flux-dev",
      prompt: "",
      guidance: 3.5,
      num_outputs: 1,
      aspect_ratio: "1:1",
      output_format: "",
      output_quality: 80,
      num_inference_steps: 28,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ImageGeneratorFormSchema>) {
    const { error, success, data } = await generateImageAction(values);
    console.log(error, success, data);
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
                      Dev
                    </SelectItem>
                    <SelectItem value="m@google.com">Schnell</SelectItem>
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
                      <SelectItem value="1:1">1:1</SelectItem>
                      <SelectItem value="16:9">16:9</SelectItem>
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
                    min={0}
                    max={50}
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
                    <SelectItem value="jpg">jpg</SelectItem>
                    <SelectItem value="png">png</SelectItem>
                    <SelectItem value="webp">webp</SelectItem>
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
                </div>{" "}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter your prompt here..."
                      className="h-[8rem]"
                    />
                  </FormControl>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            Submit
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default Configurations;
