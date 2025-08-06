"use server"
import { Tables } from "@/database.types";
import { createClient } from "@/lib/supabase/server";

interface CreditResponse{
    error: null | string ;
    success: boolean ;
    data: Tables<"credits"> | null ;
}

export async function getCredits(): Promise<CreditResponse>{
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser()

    const {data: creditsData, error} = await supabase.from('credits').select('*').eq('user_id', user?.id).single()

    if(error){
        return{
            error:error?.message || null,
            success: false,
            data: null,
        }
    }
    return{
            error: null,
            success: true,
            data: creditsData,
        }
}

// Check credits for video generation (uses same pool as images)
export async function checkVideoCredits(duration: number, resolution: string): Promise<CreditResponse> {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser()

    if (!user) {
        return {
            error: "User not authenticated",
            success: false,
            data: null,
        }
    }

    const {data: creditsData, error} = await supabase.from('credits').select('*').eq('user_id', user.id).single()

    if(error){
        return{
            error: error?.message || null,
            success: false,
            data: null,
        }
    }

    // Calculate credits needed based on resolution and duration
    const creditsPerSecond = resolution === '1080p' ? 4 : 1; // 4 credits/second for 1080p, 1 credit/second for 480p
    const creditsNeeded = duration * creditsPerSecond;

    if (!creditsData || creditsData.image_generation_count === null || creditsData.max_image_generation_count === null) {
        return {
            error: "No credits available",
            success: false,
            data: null,
        }
    }

    const remainingCredits = creditsData.max_image_generation_count - creditsData.image_generation_count;

    if (remainingCredits < creditsNeeded) {
        return {
            error: `Insufficient credits. Need ${creditsNeeded} credits, but only have ${remainingCredits} remaining.`,
            success: false,
            data: creditsData,
        }
    }

    return {
        error: null,
        success: true,
        data: creditsData,
    }
}

// Deduct credits for video generation (uses same pool as images)
export async function deductVideoCredits(duration: number, resolution: string): Promise<CreditResponse> {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser()

    if (!user) {
        return {
            error: "User not authenticated",
            success: false,
            data: null,
        }
    }

    const creditsPerSecond = resolution === '1080p' ? 2 : 1;
    const creditsToDeduct = duration * creditsPerSecond;

    // First, fetch the current credits data
    const { data: currentCredits, error: fetchError } = await supabase
        .from('credits')
        .select('*')
        .eq('user_id', user.id)
        .single();

    if (fetchError || !currentCredits) {
        return {
            error: fetchError?.message || "Unable to fetch current credits",
            success: false,
            data: null,
        }
    }

    const newImageGenerationCount = (currentCredits.image_generation_count || 0) + creditsToDeduct;

    const { data: updatedCredits, error: updateError } = await supabase
        .from('credits')
        .update({ 
            image_generation_count: newImageGenerationCount
        })
        .eq('user_id', user.id)
        .select()
        .single();

    if(updateError){
        return{
            error: updateError?.message || null,
            success: false,
            data: null,
        }
    }

    return {
        error: null,
        success: true,
        data: updatedCredits,
    }
}
