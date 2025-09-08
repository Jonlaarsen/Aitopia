"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Volume2, Play, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useTextToSpeechStore } from "@/store/useTextToSpeechStore";
import { storeTextToSpeech, uploadAudioFile } from "@/app/actions/speech-actions";

interface TextToSpeechConfig {
  text: string;
  voice: string;
  speed: number;
  format: string;
}

const voices = [
  { value: "alloy", label: "Alloy" },
  { value: "echo", label: "Echo" },
  { value: "fable", label: "Fable" },
  { value: "onyx", label: "Onyx" },
  { value: "nova", label: "Nova" },
  { value: "shimmer", label: "Shimmer" },
];

const formats = [
  { value: "mp3", label: "MP3" },
  { value: "opus", label: "Opus" },
  { value: "aac", label: "AAC" },
  { value: "flac", label: "FLAC" },
];

export default function TextToSpeechConfigurations() {
  const { addEntry } = useTextToSpeechStore();
  const [config, setConfig] = useState<TextToSpeechConfig>({
    text: "",
    voice: "alloy",
    speed: 1.0,
    format: "mp3",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTextChange = (value: string) => {
    setConfig(prev => ({ ...prev, text: value }));
  };

  const handleVoiceChange = (value: string) => {
    setConfig(prev => ({ ...prev, voice: value }));
  };

  const handleSpeedChange = (value: number[]) => {
    setConfig(prev => ({ ...prev, speed: value[0] }));
  };

  const handleFormatChange = (value: string) => {
    setConfig(prev => ({ ...prev, format: value }));
  };

  const generateSpeech = async () => {
    if (!config.text.trim()) {
      toast.error("Please enter some text to convert to speech");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a title for the audio file");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error("Failed to generate speech");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setAudioBlob(blob);
      
      // Create a file from the blob for upload
      const fileName = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.${config.format}`;
      const file = new File([blob], fileName, { type: `audio/${config.format}` });
      
      // Upload to Supabase Storage
      const uploadResult = await uploadAudioFile(file);
      
      if (!uploadResult.success) {
        throw new Error("Failed to upload audio file");
      }
      
      // Save to database
      const dbResult = await storeTextToSpeech({
        fileName: fileName,
        audioUrl: uploadResult.url!,
        text: config.text,
        voice: config.voice,
        language: "en", // You might want to make this configurable
        speed: config.speed,
        pitch: 1.0, // Default pitch
        volume: 1.0, // Default volume
        fileSize: blob.size,
        duration: undefined, // You could calculate this if needed
        format: config.format,
        title: title,
        description: description,
      });

      if (!dbResult.success) {
        console.error("Failed to save to database:", dbResult.error);
        toast.error("Audio generated but failed to save to database");
      } else {
        toast.success("Speech generated and saved successfully!");
      }
      
      // Add to local store
      addEntry({
        text: config.text,
        voice: config.voice,
        speed: config.speed,
        format: config.format,
        audioUrl: url,
      });
      
    } catch (error) {
      console.error("Error generating speech:", error);
      toast.error("Failed to generate speech. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAudio = () => {
    if (!audioBlob) return;
    
    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `speech.${config.format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Text to Speech Configuration
          </CardTitle>
          <CardDescription>
            Convert your text into natural-sounding speech using OpenAI&apos;s advanced voice models.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Text to Convert</Label>
            <Textarea
              id="text"
              placeholder="Enter the text you want to convert to speech..."
              value={config.text}
              onChange={(e) => handleTextChange(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <p className="text-sm text-muted-foreground">
              {config.text.length} characters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <input
                id="title"
                type="text"
                placeholder="Enter a title for the audio file"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <input
                id="description"
                type="text"
                placeholder="Enter a description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voice">Voice</Label>
              <Select value={config.voice} onValueChange={handleVoiceChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.value} value={voice.value}>
                      {voice.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="speed">Speed: {config.speed}x</Label>
              <Slider
                id="speed"
                value={[config.speed]}
                onValueChange={handleSpeedChange}
                min={0.25}
                max={4.0}
                step={0.25}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Format</Label>
              <Select value={config.format} onValueChange={handleFormatChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {formats.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.value.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={generateSpeech}
            disabled={isGenerating || !config.text.trim() || !title.trim()}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Speech...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Generate Speech
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {audioUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Audio</CardTitle>
            <CardDescription>
              Preview and download your generated speech audio.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <audio controls className="w-full" src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
            
            <div className="flex gap-2">
              <Button onClick={downloadAudio} variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download Audio
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
