"use server"

import { createClient } from "@/lib/supabase/server";

// Text-to-Speech interfaces and functions
export interface TextToSpeechData {
  fileName: string;
  audioUrl: string;
  text: string;
  voice: string;
  language: string;
  speed?: number;
  pitch?: number;
  volume?: number;
  fileSize: number;
  duration?: number;
  format: string;
  title?: string;
  description?: string;
}

export interface TextToSpeechRecord {
  id: string;
  user_id: string;
  file_name: string;
  audio_url: string;
  text_content: string;
  voice: string;
  language: string;
  speed: number;
  pitch: number;
  volume: number;
  file_size: number;
  duration: number | null;
  format: string;
  title: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export async function uploadAudioFile(file: File): Promise<{
  error: string | null;
  success: boolean;
  url: string | null;
}> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: "User not authenticated", success: false, url: null };
  }
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${user.id}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('text-to-speech-audio')
    .upload(filePath, file);

  if (error) {
    return { error: error.message, success: false, url: null };
  }

  const { data: { publicUrl } } = supabase.storage
    .from('text-to-speech-audio')
    .getPublicUrl(filePath);

  return { error: null, success: true, url: publicUrl };
}

export async function storeTextToSpeech(data: TextToSpeechData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: "User not authenticated", success: false };
  }

  const { data: insertData, error } = await supabase
    .from("text_to_speech")
    .insert([{
      user_id: user.id,
      file_name: data.fileName,
      audio_url: data.audioUrl,
      text_content: data.text,
      voice: data.voice,
      language: data.language,
      speed: data.speed || 1.0,
      pitch: data.pitch || 1.0,
      volume: data.volume || 1.0,
      file_size: data.fileSize,
      duration: data.duration || null,
      format: data.format,
      title: data.title || null,
      description: data.description || null,
    }])
    .select();

  return { error: error?.message, success: !error, data: insertData };
}

export async function getTextToSpeechFiles(limit?: number): Promise<{
  error: string | null;
  success: boolean;
  data: TextToSpeechRecord[] | null;
}> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: "User not authenticated", success: false, data: null };
  }

  let query = supabase
    .from("text_to_speech")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data: queryData, error } = await query;
  
  return {
    error: error?.message || null,
    success: !error,
    data: queryData || null
  };
}

export async function getTextToSpeechById(id: string): Promise<{
  error: string | null;
  success: boolean;
  data: TextToSpeechRecord | null;
}> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: "User not authenticated", success: false, data: null };
  }

  const { data, error } = await supabase
    .from("text_to_speech")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  return {
    error: error?.message || null,
    success: !error,
    data: data || null
  };
}

export async function updateTextToSpeech(
  id: string, 
  updates: Partial<Pick<TextToSpeechData, 'title' | 'description'>>
): Promise<{
  error: string | null;
  success: boolean;
  data: TextToSpeechRecord | null;
}> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: "User not authenticated", success: false, data: null };
  }

  const { data, error } = await supabase
    .from("text_to_speech")
    .update({
      title: updates.title,
      description: updates.description,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  return {
    error: error?.message || null,
    success: !error,
    data: data || null
  };
}

export async function deleteTextToSpeech(id: string): Promise<{
  error: string | null;
  success: boolean;
}> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: "User not authenticated", success: false };
  }

  const { error } = await supabase
    .from("text_to_speech")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  return {
    error: error?.message || null,
    success: !error
  };
}

export async function searchTextToSpeech(searchTerm: string): Promise<{
  error: string | null;
  success: boolean;
  data: TextToSpeechRecord[] | null;
}> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: "User not authenticated", success: false, data: null };
  }

  const { data, error } = await supabase
    .from("text_to_speech")
    .select("*")
    .eq("user_id", user.id)
    .or(`file_name.ilike.%${searchTerm}%,text_content.ilike.%${searchTerm}%,title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .order("created_at", { ascending: false });

  return {
    error: error?.message || null,
    success: !error,
    data: data || null
  };
}
