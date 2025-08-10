"use client";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { Button } from "../ui/button";
import SignupForm from "./SignupForm";
import ResetForm from "./ResetForm";

const AuthForm = ({ state }: { state: string }) => {
  const [mode, setMode] = useState(state);
  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col space-y-2 text-center px-4 sm:px-0 ">
        <h1 className="text-2xl font-semibold tracking-tight">
          {mode === "reset"
            ? "Reset Password"
            : mode === "login"
            ? "Login"
            : "Sign up"}
        </h1>
        <p className="text-sm text-zinc-700 pb-4">
          {mode === "reset"
            ? "Enter your email to reset your password"
            : mode === "login"
            ? "Enter your email and password to login."
            : "Enter your information to register for an account."}
        </p>
      </div>
      {mode === "login" && (
        <div>
          <LoginForm />
          <div className="flex sm:flex-row flex-col justify-evenly ">
            <Button variant={"link"} onClick={() => setMode("signup")}>
              Need an account? Sign Up
            </Button>
            <Button variant={"link"} onClick={() => setMode("reset")}>
              Forgot your password?
            </Button>
          </div>
        </div>
      )}
      {mode === "signup" && (
        <>
          <SignupForm />
          <div className="flex sm:flex-row flex-col justify-evenly ">
            <Button variant={"link"} onClick={() => setMode("login")}>
              Already have an account?
            </Button>
            <Button variant={"link"} onClick={() => setMode("reset")}>
              Forgot your password?
            </Button>
          </div>
          <p className="text-center text-zinc-600 text-sm px-6 pt-4">
            By clicking submit you agree to our guidelines and Terms of Service.
          </p>
        </>
      )}
      {mode === "reset" && (
        <>
          <ResetForm />
          <div className="text-center ">
            <Button variant={"link"} onClick={() => setMode("login")}>
              Already have an account?
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthForm;
