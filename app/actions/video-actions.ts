"use server"
//@typescript-eslint/no-explicit-any

import { z } from "zod";
import Replicate from "replicate";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@database.types";
import { randomUUID } from "crypto";
import { getCredits } from "./credit-actions";
import { VideoGeneratorFormSchema } from "@/components/video-generation/VideoConfigurations";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  useFileOutput: false
});

interface VideoResponse {
  error: string | null;
  success: boolean;
  data: unknown | null;
}

export async function generateVideoAction(input: z.infer<typeof VideoGeneratorFormSchema>): Promise<VideoResponse> {
  const { data: credits } = await getCredits();
  if (!credits?.image_generation_count || credits.image_generation_count <= 0) {
    return {
      error: "No credits available",
      success: false,
      data: null,
    };
  }

  // Validate Veo 3 Fast duration
  if (input.model === "google/veo-3-fast" && input.duration !== 8) {
    return {
      error: "Google Veo 3 Fast only supports 8-second videos",
      success: false,
      data: null,
    };
  }

  // Calculate required credits based on model
  let requiredCredits = 0;
  if (input.model === "google/veo-3-fast") {
    requiredCredits = 40; // Fixed 40 credits for Veo 3 Fast
  } else {
    // Seedance Pro: calculate based on duration and resolution
    if (input.resolution === '480p') {
      requiredCredits = input.duration * 1; // 1 credit per second for 480p
    } else if (input.resolution === '720p') {
      requiredCredits = input.duration * 2; // 2 credits per second for 720p
    } else if (input.resolution === '1080p') {
      requiredCredits = input.duration * 4; // 4 credits per second for 1080p
    } else {
      requiredCredits = input.duration * 1; // Default to 1 credit per second
    }
  }

  // Check if user has enough credits
  if (credits.image_generation_count < requiredCredits) {
    return {
      error: `Insufficient credits. You need ${requiredCredits} credits for this generation.`,
      success: false,
      data: null,
    };
  }

  // Model-specific parameters
/* eslint-disable  no-explicit-any */  
let modelInput: any = {
    prompt: input.prompt,
  };

  if (input.model === "google/veo-3-fast") {
    // Veo 3 Fast parameters - force duration to 8
    modelInput = {
      prompt: input.prompt,
      duration: 8, // Always 8 seconds for Veo 3 Fast
      fps: input.fps,
      resolution: input.resolution,
      aspect_ratio: input.aspect_ratio,
    };
  } else {
    // Seedance Pro parameters
    modelInput = {
      prompt: input.prompt,
      duration: input.duration,
      fps: input.fps,
      resolution: input.resolution,
      aspect_ratio: input.aspect_ratio,
      // Seedance Pro doesn't use camera_fixed parameter
    };
  }

  try {
    const output = await replicate.run(input.model as `${string}/${string}` | `${string}/${string}:${string}`, { input: modelInput });
    console.log("video output", output);
    return {
      error: null,
      success: true,
      data: output,
    };
  } catch (error: unknown) {
    console.error("Video generation error:", error);
    return {
      error: "Failed to generate video",
      success: false,
      data: null,
    };
  }
}

export async function videoUrlToBlob(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  return await blob.arrayBuffer();
}

type storeVideoInput = { url: string } & Database["public"]["Tables"]["generated_videos"]["Insert"];

export async function storeVideos(data: storeVideoInput[]) {
  console.log("storeVideos called with data:", data);
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return {
      error: "User not authenticated",
      success: false,
      data: null
    };
  }

  const uploadResults = [];

  for (const video of data) {
    const arrayBuffer = await videoUrlToBlob(video.url);
    const filename = `video_${randomUUID()}.mp4`;
    const filepath = `${user.id}/${filename}`;

    const { error: storageError } = await supabase.storage.from("generated.videos").upload(filepath, arrayBuffer, {
      contentType: 'video/mp4',
      cacheControl: '3600',
      upsert: false
    });

    if (storageError) {
      uploadResults.push({
        filename,
        error: storageError.message,
        success: false,
        data: null
      });
      continue;
    }

    const { data: dbData, error: dbError } = await supabase.from("generated_videos").insert([{
      user_id: user.id,
      model: video.model,
      prompt: video.prompt,
      duration: video.duration,
      fps: video.fps,
      resolution: video.resolution,
      aspect_ratio: video.aspect_ratio,
      camera_fixed: video.camera_fixed,
      video_name: filename
    }]).select();

    if (dbError) {
      uploadResults.push({
        filename,
        error: dbError.message,
        success: !dbError,
        data: dbData || null
      });
    }
  }

  console.log("uploadResults:", uploadResults);

  return {
    error: null,
    success: true,
    data: { results: uploadResults }
  };
}

export async function getVideos(limit?: number) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return {
      error: "User not authenticated",
      success: false,
      data: null
    };
  }

  let query = supabase.from("generated_videos").select("*").eq("user_id", user.id).order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }
  const { data, error } = await query;

  if (error) {
    return {
      error: error.message || "Failed to fetch videos.",
      success: false,
      data: null
    };
  }

  const videosWithUrls = await Promise.all(
    data.map(async (video: Database["public"]["Tables"]["generated_videos"]["Row"]) => {
      const { data } = await supabase.storage.from("generated.videos").createSignedUrl(`${user.id}/${video.video_name}`, 3600);

      return {
        ...video,
        url: data?.signedUrl
      };
    })
  );

  return {
    error: null,
    success: true,
    data: videosWithUrls || null
  };
}

export async function deleteVideo(id: number, videoName: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return {
      error: "User not authenticated",
      success: false,
      data: null
    };
  }

  const { data, error } = await supabase.from("generated_videos").delete().eq('id', id);
  if (error) {
    return {
      error: error.message, success: false, data: null
    };
  }

  await supabase.storage.from('generated.videos').remove([`${user.id}/${videoName}`]);

  return {
    error: null, success: true, data: data
  };
} 