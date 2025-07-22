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

const formSchema = z.object({
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a model to use." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">Dev</SelectItem>
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
                <FormLabel>Aspect Ratio</FormLabel>
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
                <FormLabel>Number of Outputs</FormLabel>
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
                <div>Guidance</div> <span>{field.value}</span>
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
                <div>Number of Inference Steps</div> <span>{field.value}</span>
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
                <div>Output Quality</div> <span>{field.value}</span>
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Configurations;
