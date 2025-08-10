"use server"
//@typescript-eslint/no-explicit-any
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

    if (error) {
        return {
            error: error.message || `There was an error signing up`,
            success: false,
            data: null
        };
    }

    // If signup successful, create initial credits for the new user
    if (signupData.user) {
        try {
            const { error: creditsError } = await supabase
                .from('credits')
                .insert({
                    user_id: signupData.user.id,
                    image_generation_count: 5, // 5 free credits
                    max_image_generation_count: 5,
                    model_training_count: 0,
                    max_model_training_count: 0
                });

            if (creditsError) {
                console.error('Error creating initial credits:', creditsError);
                // Don't fail the signup if credits creation fails
                // The user can still sign up, just won't have initial credits
            }
        } catch (creditsError) {
            console.error('Error creating initial credits:', creditsError);
            // Don't fail the signup if credits creation fails
        }
    }

    return {
        error: null,
        success: true,
        data: signupData
    };
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

export async function updateProfile(values:{fullName: string}): Promise<AuthResponse> {
    const supabase = await createClient();
    const full_name = values.fullName


    const { data : profileData, error } = await supabase.auth.updateUser(
        {
            data:{full_name}
        }
    );

    return{
        error: error?.message || `There was an error updating your profile!`,
        success: !error,
        data: profileData || null
    }
}

export async function resetPassword(values:{email: string}): Promise<AuthResponse> {
    const supabase = await createClient();


    const { data : resetPasswordData, error } = await supabase.auth.resetPasswordForEmail(
        values.email
    );

    return{
        error: error?.message || `There was an error reseting your password with email!`,
        success: !error,
        data: resetPasswordData || null
    }
}

export async function changePassword(newPassword: string): Promise<AuthResponse> {
    const supabase = await createClient();

   

    const { data , error } = await supabase.auth.updateUser({
        password : newPassword
    });

    return{
        error: error?.message || `There was an error changing your password`,
        success: !error,
        data: data || null
    }
}