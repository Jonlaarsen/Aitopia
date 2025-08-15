"use client";
import React, { useId, useState } from "react";
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
import { cn } from "@/lib/utils";
import { Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import { signup } from "@/app/actions/auth-actions";
import Link from "next/link";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[\w!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

const formSchema = z
  .object({
    full_name: z.string().min(3, { message: "Full name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string({ error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(passwordRegex, {
        message:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    confirm_password: z.string({ error: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords does not match",
    path: ["confirm_password"],
  });

const SignupForm = ({ className }: { className?: string }) => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
      setShowSuccess(true);
    }
    setLoading(false);
  }

  if (showSuccess) {
    return (
      <div
        className={cn(
          "grid gap-4 w-full bg-white rounded-2xl p-8 border border-black",
          className
        )}
      >
        <div className="text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-zinc-800 via-indigo-500 to-slate-600 rounded-full flex items-center justify-center shadow-lg">
            <Mail className="w-10 h-10 text-white" />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">
              Check Your Email!
            </h2>
            <p className="text-gray-600">
              We've sent you a confirmation email. Please check your inbox and
              click the link to verify your account.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 text-blue-700">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium">
                Verification email sent
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              asChild
              variant="outline"
              className="flex-1 border-gray-300 hover:bg-gray-50"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-zinc-600 via-slate-600 to-zinc-600 hover:from-zinc-700 hover:via-slate-700 hover:to-zinc-700 text-white"
            >
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-4 w-full bg-white rounded-2xl p-8 border border-black",
        className
      )}
    >
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
