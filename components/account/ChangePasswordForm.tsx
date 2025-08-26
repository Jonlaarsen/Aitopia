"use client";
import React, { useId, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { changePassword } from "@/app/actions/auth-actions";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const formSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(passwordRegex, {
        message:
          "Password must contain at least 8 characters and atleast one uppercase letter, one lowercase letter, and one number",
      }),
    confirmPassword: z.string({ required_error: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"],
  });

const ChangePasswordForm = ({ className }: { className?: string }) => {
  const [loading, setLoading] = useState(false);

  const toastId = useId();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Changing password..", { id: toastId });
    setLoading(true);
    try {
      const { success, error } = await changePassword(values.password);
      if (!success) {
        toast.error(String(error), { id: toastId });
        setLoading(false);
      } else {
        toast.success("Changed password successfully", { id: toastId });
        redirect("/login");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={cn(
        "grid gap-4 w-full bg-white rounded-2xl p-8 border border-black",
        className
      )}
    >
      <div className="flex flex-col space-y-2 text-center ">
        <h1 className="text-2xl font-semibold tracking-tight">
          Change Password
        </h1>
        <p className="text-sm text-zinc-700 pb-4">
          Enter your new password below to change your password.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <FormDescription>Enter a strong password.</FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    className="border-zinc-400"
                    type="password"
                    placeholder="password123"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Re-enter your new password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {loading && <Loader2 className="h-4 mr-2 animate-spin" />}
            {loading ? "Changing password..." : "Change password"}
          </Button>
          <div className="text-center text-sm text-zinc-500">
            Make sure to remember your new password.
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
