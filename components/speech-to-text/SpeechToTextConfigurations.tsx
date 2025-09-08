"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Mic,
  FileAudio,
  Loader2,
  Video,
  Music,
  Play,
} from "lucide-react";
import { useState, useRef } from "react";
import { useSpeechToTextStore } from "@/store/useSpeechToTextStore";
import { storeTranscription } from "@/app/actions/text-actions";
import { toast } from "sonner";

export default function SpeechToTextConfigurations() {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isExtractingAudio, setIsExtractingAudio] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState<"audio" | "video" | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("whisper-1");
  const [language, setLanguage] = useState("auto");
  const [responseFormat, setResponseFormat] = useState("json");
  const [extractedAudio, setExtractedAudio] = useState<Blob | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { addTranscription, transcriptions } = useSpeechToTextStore();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is audio or video
      if (!file.type.startsWith("audio/") && !file.type.startsWith("video/")) {
        toast.error("Please select an audio or video file");
        return;
      }

      setSelectedFile(file);
      setFileName(file.name);
      setFileType(file.type.startsWith("audio/") ? "audio" : "video");
    }
  };

  const handleTranscribe = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to transcribe");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a title for the transcription");
      return;
    }

    setIsTranscribing(true);

    try {
      let fileToTranscribe = selectedFile;

      // For video files, send directly to OpenAI (they support video formats)
      if (fileType === "video") {
        toast.info(
          "Sending video file directly to OpenAI for transcription..."
        );
        fileToTranscribe = selectedFile;
      }

      const formData = new FormData();
      formData.append("file", fileToTranscribe);
      formData.append("model", model);
      formData.append("language", language);
      formData.append("response_format", responseFormat);

      // Debug: Log file details
      console.log("File being sent:", {
        name: fileToTranscribe.name,
        type: fileToTranscribe.type,
        size: fileToTranscribe.size,
      });

      const response = await fetch("/api/speech-to-text", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Transcription failed");
      }

      const result = await response.json();

      // Save to database
      const dbResult = await storeTranscription({
        fileName: fileName,
        text: result.text,
        model: model,
        language: language,
        fileSize: selectedFile.size,
        originalFileType: fileType || "audio",
        responseFormat: responseFormat,
        title: title,
        description: description,
      });

      if (!dbResult.success) {
        console.error(
          "Failed to save transcription to database:",
          dbResult.error
        );
        toast.error("Transcription completed but failed to save to database");
      } else {
        toast.success("Transcription completed and saved successfully!");
      }

      // Add to local store
      addTranscription({
        id: Date.now().toString(),
        fileName: fileName,
        text: result.text,
        model: model,
        language: language,
        timestamp: new Date().toISOString(),
        fileSize: selectedFile.size,
        originalFileType: fileType || "audio",
        title: title,
        description: description,
      });

      // Reset form
      setSelectedFile(null);
      setFileName("");
      setFileType(null);
      setTitle("");
      setDescription("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Transcription error:", error);
      toast.error("Transcription failed. Please try again.");
    } finally {
      setIsTranscribing(false);
    }
  };

  const supportedFormats = [
    "mp3",
    "mp4",
    "mpeg",
    "mpga",
    "m4a",
    "wav",
    "webm",
    "avi",
    "mov",
    "mkv",
  ];

  // Function to extract audio from video
  const extractAudio = async () => {
    if (!selectedFile || fileType !== "video") return;

    setIsExtractingAudio(true);
    try {
      const video = document.createElement("video");
      video.muted = true;
      video.playsInline = true;

      const stream = (video as any).captureStream();
      const mediaRecorder = new MediaRecorder(stream);

      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        setExtractedAudio(audioBlob);
        toast.success("Audio extracted successfully!");
        setIsExtractingAudio(false);
      };

      video.onloadedmetadata = () => {
        video.currentTime = 0;
        mediaRecorder.start();
        video.play();
      };

      video.onended = () => {
        mediaRecorder.stop();
      };

      const videoURL = URL.createObjectURL(selectedFile);
      video.src = videoURL;
      video.load();
    } catch (error) {
      console.error("Audio extraction failed:", error);
      toast.error("Failed to extract audio");
    }
  };

  // Function to play extracted audio
  const playExtractedAudio = () => {
    if (!extractedAudio) return;

    const audio = new Audio(URL.createObjectURL(extractedAudio));
    audio.play().catch((error) => {
      console.error("Failed to play audio:", error);
      toast.error("Failed to play audio");
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5" />
          Speech to Text
        </CardTitle>
        <CardDescription>
          Upload an audio or video file to convert speech to text. Video files
          will automatically have their audio extracted.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Upload */}
        <div className="space-y-2">
          <Label htmlFor="media-file">Audio or Video File</Label>
          <div className="flex items-center gap-2">
            <Input
              id="media-file"
              type="file"
              accept="audio/*,video/*"
              onChange={handleFileSelect}
              ref={fileInputRef}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
          {fileName && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Selected: {fileName}</span>
              {fileType && (
                <span className="flex items-center gap-1">
                  <span>•</span>
                  {fileType === "video" ? (
                    <>
                      <Video className="h-3 w-3" />
                      <span>Video</span>
                    </>
                  ) : (
                    <>
                      <Music className="h-3 w-3" />
                      <span>Audio</span>
                    </>
                  )}
                </span>
              )}
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Supported formats: {supportedFormats.join(", ")}
          </p>

          {/* Audio Extraction Controls for Video Files */}
          {fileType === "video" && selectedFile && (
            <div className="space-y-2">
              <Label>Audio Extraction</Label>
              <div className="flex gap-2">
                {extractedAudio === null ? (
                  <Button
                    onClick={extractAudio}
                    disabled={isExtractingAudio}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    {isExtractingAudio ? (
                      <>
                        <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        Extracting...
                      </>
                    ) : (
                      <>
                        <Music className="mr-2 h-3 w-3" />
                        Extract Audio
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={playExtractedAudio}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Play className="mr-2 h-3 w-3" />
                    Play Audio
                  </Button>
                )}
              </div>
              {extractedAudio && (
                <p className="text-xs text-green-600">
                  ✓ Audio extracted successfully! You can play it to verify
                  quality.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Title and Description Inputs */}
        <div className="grid grid-cols-1  gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for the transcription"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description for the transcription"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              rows={3}
            />
          </div>
        </div>

        {/* Model Selection */}
        <div className="space-y-2 w-full">
          <Label htmlFor="model">Model</Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-full ">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="whisper-1">Whisper 1</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Language Selection */}
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto-detect</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="it">Italian</SelectItem>
              <SelectItem value="pt">Portuguese</SelectItem>
              <SelectItem value="ru">Russian</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
              <SelectItem value="ko">Korean</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Response Format */}
        <div className="space-y-2">
          <Label htmlFor="response-format">Response Format</Label>
          <Select value={responseFormat} onValueChange={setResponseFormat}>
            <SelectTrigger className="w-full ">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="srt">SRT</SelectItem>
              <SelectItem value="verbose_json">Verbose JSON</SelectItem>
              <SelectItem value="vtt">VTT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transcribe Button */}
        <Button
          onClick={handleTranscribe}
          disabled={
            !selectedFile ||
            !title.trim() ||
            isTranscribing ||
            isExtractingAudio
          }
          className="w-full"
        >
          {isExtractingAudio ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Extracting Audio...
            </>
          ) : isTranscribing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Transcribing...
            </>
          ) : (
            <>
              <FileAudio className="mr-2 h-4 w-4" />
              {fileType === "video" ? "Transcribe Video" : "Transcribe Audio"}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
