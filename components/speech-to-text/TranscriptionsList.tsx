"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Copy,
  Download,
  Trash2,
  FileText,
  Clock,
  Languages,
  Video,
  Music,
} from "lucide-react";
import { useSpeechToTextStore } from "@/store/useSpeechToTextStore";
import { getTranscriptions } from "@/app/actions/text-actions";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";

export default function TranscriptionsList() {
  const { transcriptions, removeTranscription, addTranscription } = useSpeechToTextStore();
  const [isLoading, setIsLoading] = useState(true);
  const [dbTranscriptions, setDbTranscriptions] = useState<any[]>([]);
  console.log("TranscriptionsList render", transcriptions);

  // Load transcriptions from database on component mount
  useEffect(() => {
    const loadTranscriptions = async () => {
      try {
        setIsLoading(true);
        const result = await getTranscriptions(1); // Only get the latest one for this component
        if (result.success && result.data) {
          setDbTranscriptions(result.data);
          // Also add to local store for immediate UI updates
          result.data.forEach((dbTranscription: any) => {
            const existingTranscription = transcriptions.find(t => t.id === dbTranscription.id);
            if (!existingTranscription) {
              addTranscription({
                id: dbTranscription.id,
                fileName: dbTranscription.file_name,
                text: dbTranscription.text_content,
                model: dbTranscription.model,
                language: dbTranscription.language,
                timestamp: dbTranscription.created_at || new Date().toISOString(),
                fileSize: dbTranscription.file_size,
                originalFileType: dbTranscription.original_file_type as "audio" | "video",
                title: dbTranscription.title,
                description: dbTranscription.description,
              });
            }
          });
        }
      } catch (error) {
        console.error("Failed to load transcriptions:", error);
        toast.error("Failed to load transcriptions from database");
      } finally {
        setIsLoading(false);
      }
    };

    loadTranscriptions();
  }, []);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Text copied to clipboard");
    } catch {
      toast.error("Failed to copy text");
    }
  };

  const handleDownload = (text: string, fileName: string) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName.replace(/\.[^/.]+$/, "")}_transcription.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Transcription downloaded");
  };

  const handleDelete = (id: string) => {
    removeTranscription(id);
    toast.success("Transcription deleted");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Use database transcriptions if available, otherwise fall back to local store
  const sourceTranscriptions = dbTranscriptions.length > 0 ? dbTranscriptions : transcriptions;

  if (isLoading) {
    return (
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Loading Transcriptions
          </CardTitle>
          <CardDescription>
            Loading your latest transcription...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50 animate-pulse" />
            <p>Loading transcription...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (sourceTranscriptions.length === 0) {
    return (
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Transcriptions
          </CardTitle>
          <CardDescription>
            Your completed transcriptions will appear here
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No transcriptions yet</p>
            <p className="text-sm">Upload an audio file to get started</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Latest Transcription
        </CardTitle>
        <CardDescription>
          Your most recent speech-to-text transcription
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-4">
            {sourceTranscriptions.slice(0, 1).map((transcription) => {
              const fileName = transcription.file_name || transcription.fileName;
              const text = transcription.text_content || transcription.text;
              const timestamp = transcription.created_at || transcription.timestamp;
              const fileSize = transcription.file_size || transcription.fileSize;
              const language = transcription.language;
              const originalFileType = transcription.original_file_type || transcription.originalFileType;
              const model = transcription.model;
              
              return (
                <Card
                  key={transcription.id}
                  className="border-l-4 border-l-blue-500"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-medium truncate">
                          {fileName}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>
                            {formatDistanceToNow(
                              new Date(timestamp),
                              { addSuffix: true }
                            )}
                          </span>
                          <span>•</span>
                          <span>{formatFileSize(fileSize)}</span>
                          <span>•</span>
                          <Languages className="h-4 w-4" />
                          <span>
                            {language === "auto"
                              ? "Auto-detected"
                              : language.toUpperCase()}
                          </span>
                          {originalFileType && (
                            <>
                              <span>•</span>
                              {originalFileType === "video" ? (
                                <span className="flex items-center gap-1">
                                  <Video className="h-3 w-3" />
                                  <span>Video</span>
                                </span>
                              ) : (
                                <span className="flex items-center gap-1">
                                  <Music className="h-3 w-3" />
                                  <span>Audio</span>
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {model}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="bg-muted/50 rounded-lg p-3 mb-3">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {text}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(text)}
                        className="flex-1"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleDownload(text, fileName)
                        }
                        className="flex-1"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(transcription.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
