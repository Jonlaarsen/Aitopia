"use client";

import { logout } from "@/app/actions/auth-actions";
import { LogOut } from "lucide-react";
import React from "react";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logout();
  };
  return (
    <span
      onClick={handleLogout}
      className="flex items-center w-full text-red-700 cursor-pointer gap-1"
    >
      <LogOut className="text-red-700" />
      Log out
    </span>
  );
};

export default LogoutButton;
