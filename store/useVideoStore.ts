import { generateVideoAction, storeVideos } from '@/app/actions/video-actions';
import { VideoGeneratorFormSchema } from '@/components/video-generation/VideoConfigurations';
import { z } from 'zod';
import { create } from 'zustand';
import { toast } from 'sonner';

interface VideoState {
  loading: boolean;
  videos: Array<{ url: string }>;
  error: string | null;
  generateVideo: (values: z.infer<typeof VideoGeneratorFormSchema>) => Promise<void>;
}

const useVideoStore = create<VideoState>((set) => ({
  loading: false,
  videos: [],
  error: null,

  generateVideo: async (values: z.infer<typeof VideoGeneratorFormSchema>) => {
    console.log("generateVideo function called with values:", values);
    set({ loading: true, error: null });

    const toastId = toast.loading("Generating video...");

    try {
      const { error, success, data } = await generateVideoAction(values);
      if (!success) {
        set({ loading: false, error: error });
        toast.error(error || "Failed to generate video", { id: toastId });
        return;
      }

      console.log('video data', data);

      // Handle data as either a string (single video URL) or array of strings
      let videoUrls: string[] = [];
      if (typeof data === 'string') {
        videoUrls = [data];
      } else if (Array.isArray(data)) {
        videoUrls = data as string[];
      }

      const dataWithUrl = videoUrls.map((url: string) => {
        return { 
          url, 
          ...values 
        }
      });

      console.log("data with url", dataWithUrl);

      set({ videos: dataWithUrl, loading: false });
      toast.success("Video generated successfully!", { id: toastId });

      await storeVideos(dataWithUrl);
      toast.success("Video stored successfully!", { id: toastId });

    } catch (error: any) {
      console.error(error);
      set({
        loading: false,
        error: "Failed to generate video, please try again"
      });
      toast.error("Failed to generate video", { id: toastId });
    }
  }
}));

export default useVideoStore;