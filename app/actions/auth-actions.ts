"use server"

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface AuthResponse{
    error: null | string ;
    success: boolean ;
    data: unknown | null ;
}

export async function signup(formData: FormData): Promise<AuthResponse> {
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        options: {
            data : {full_name: formData.get("full_name") as string,}
        },
    }

    const { data : signupData, error } = await supabase.auth.signUp(data);

    return{
        error: error?.message || `There was an error signing up`,
        success: !error,
        data: signupData || null
    }
}

export async function login(formData: FormData): Promise<AuthResponse> {
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
       
    }

    const { data : signupData, error } = await supabase.auth.signInWithPassword(data);

    return{
        error: error?.message || `There was an error logging in`,
        success: !error,
        data: signupData || null
    }
}

export async function logout(): Promise<void> {
    const supabase = await createClient();

    await supabase.auth.signOut();
    redirect("/login")
}