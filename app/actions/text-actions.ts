"use server"
import { createClient } from "@/lib/supabase/server";


export async function storeTranscription(data: {
    fileName: string;
    text: string;
    model: string;
    language: string;
    fileSize: number;
    originalFileType: string;
    responseFormat: string;
    title?: string;
    description?: string;
  }) {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();
    
    if (!user) {
      return { error: "User not authenticated", success: false };
    }
  
    const {data: insertData, error} = await supabase
      .from("generated_text")
      .insert([{
        user_id: user.id,
        file_name: data.fileName,
        text_content: data.text,
        model: data.model,
        language: data.language,
        file_size: data.fileSize,
        original_file_type: data.originalFileType,
        response_format: data.responseFormat,
      }])
      .select();
  
    return { error: error?.message, success: !error, data: insertData };
  }
  
  export async function getTranscriptions(limit?: number) {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();
    
    if (!user) {
      return { error: "User not authenticated", success: false, data: null };
    }
  
    let query = supabase
      .from("generated_text")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {ascending: false});
  
    if (limit) {
      query = query.limit(limit);
    }
  
    const {data: queryData, error} = await query;
    
    return {
      error: error?.message,
      success: !error,
      data: queryData || null
    };
  }