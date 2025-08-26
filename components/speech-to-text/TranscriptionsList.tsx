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
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function TranscriptionsList() {
  const { transcriptions, removeTranscription } = useSpeechToTextStore();
  console.log("TranscriptionsList render", transcriptions);

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

  if (transcriptions.length === 0) {
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
            {transcriptions.slice(0, 1).map((transcription) => (
              <Card
                key={transcription.id}
                className="border-l-4 border-l-blue-500"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-medium truncate">
                        {transcription.fileName}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          {formatDistanceToNow(
                            new Date(transcription.timestamp),
                            { addSuffix: true }
                          )}
                        </span>
                        <span>•</span>
                        <span>{formatFileSize(transcription.fileSize)}</span>
                        <span>•</span>
                        <Languages className="h-4 w-4" />
                        <span>
                          {transcription.language === "auto"
                            ? "Auto-detected"
                            : transcription.language.toUpperCase()}
                        </span>
                        {transcription.originalFileType && (
                          <>
                            <span>•</span>
                            {transcription.originalFileType === "video" ? (
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
                        {transcription.model}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-muted/50 rounded-lg p-3 mb-3">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {transcription.text}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(transcription.text)}
                      className="flex-1"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleDownload(
                          transcription.text,
                          transcription.fileName
                        )
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
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
