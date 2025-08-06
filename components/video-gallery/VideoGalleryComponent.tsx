"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { getVideos } from "@/app/actions/video-actions";
import { Tables } from "@/database.types";
import { Trash2, Download } from "lucide-react";
import { deleteVideo } from "@/app/actions/video-actions";
import { toast } from "sonner";

type Video = {
  url: string | undefined;
} & Tables<"generated_videos">;

const VideoGalleryComponent = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const { data, error } = await getVideos();
    if (error) {
      toast.error(error);
      return;
    }
    setVideos(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: number, videoName: string) => {
    const { error } = await deleteVideo(id, videoName);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Video deleted successfully");
    fetchVideos();
  };

  const handleDownload = (url: string, prompt: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${prompt.replace(/[^a-zA-Z0-9]/g, "_")}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span>Loading videos...</span>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-64">
          <span className="text-xl">No videos found</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <Card key={video.id} className="overflow-hidden">
          <CardContent className="p-0">
            <video
              className="w-full aspect-video object-cover"
              controls
              src={video.url}
            >
              Your browser does not support the video tag.
            </video>
            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-2">{video.prompt}</p>
              <div className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  {video.resolution} • {video.fps}fps • {video.duration}s
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(video.url!, video.prompt!)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(video.id, video.video_name!)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VideoGalleryComponent;