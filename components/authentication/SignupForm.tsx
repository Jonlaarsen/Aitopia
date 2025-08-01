"use client";
import React, { useId, useState } from "react";
import { set, z } from "zod";
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
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { signup } from "@/app/actions/auth-actions";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const formSchema = z
  .object({
    full_name: z.string().min(3, { message: "Full name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string({ error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(passwordRegex, {
        message:
          "Password must contain at least 8 characters and atleast one uppercase letter, one lowercase letter, and one number",
      }),
    confirm_password: z.string({ error: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords does not match",
    path: ["confirm_password"],
  });

const SignupForm = ({ className }: { className?: string }) => {
  const [loading, setLoading] = useState(false);

  const toastId = useId();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Signing up..", { id: toastId });
    setLoading(true);

    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("email", values.email);
    formData.append("password", values.password);

    const { success, error } = await signup(formData);
    if (!success) {
      toast.error(String(error), { id: toastId });
      setLoading(false);
    } else {
      toast.success("Signed up successfully", { id: toastId });
      window.location.href = "/login";
    }
    setLoading(false);
  }

  return (
    <div className={cn("grid gap-4 w-full", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    className="border-zinc-400"
                    type="text"
                    placeholder="John/Jane Doe"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="border-zinc-400"
                    placeholder="AItopia@example.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="border-zinc-400"
                    type="password"
                    placeholder="password123"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="border-zinc-400"
                    type="password"
                    placeholder="password123"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 mr-2 animate-spin" />}
            Sign up
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
