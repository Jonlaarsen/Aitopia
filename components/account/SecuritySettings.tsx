"use client";
import { User } from "@supabase/supabase-js";
import React, { useId } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { resetPassword } from "@/app/actions/auth-actions";

interface SecuritySettingsProps {
  user: User;
}

const SecuritySettings = ({ user }: SecuritySettingsProps) => {
  const toastId = useId();
  async function handleChangePassword() {
    toast.loading("Sending password reset email..", { id: toastId });

    try {
      const { success, error } = await resetPassword({
        email: user.email || "",
      });
      if (!success) {
        toast.error(error, { id: toastId });
      } else {
        toast.success("Email sent successfully, Please check your email!", {
          id: toastId,
        });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to enable 2FA";
      toast.error(errorMessage);
    }
  }

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <h1 className="text-xl font-semibold">Security</h1>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h3 className="font-medium">Password</h3>
          <p className="text-zinc-500 text-sm">
            change your password to keep your account secure
          </p>
          <Button
            variant={"outline"}
            onClick={handleChangePassword}
            className="w-full"
          >
            Change Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
