"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Play, Download, Volume2 } from "lucide-react";
import {
  useTextToSpeechStore,
  TextToSpeechEntry,
} from "@/store/useTextToSpeechStore";
import { formatDistanceToNow } from "date-fns";

export default function TextToSpeechGallery() {
  const { entries, removeEntry } = useTextToSpeechStore();

  const handleDelete = (id: string) => {
    removeEntry(id);
  };

  const downloadAudio = (entry: TextToSpeechEntry) => {
    const a = document.createElement("a");
    a.href = entry.audioUrl;
    a.download = `speech-${entry.id}.${entry.format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (entries.length === 0) {
    return (
      <Card className="lg:col-span-2">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Volume2 className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            No speech generated yet. Start by creating your first text-to-speech
            conversion.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Speech History
        </CardTitle>
        <CardDescription>
          Your recently generated text-to-speech conversions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium line-clamp-2">
                        {entry.text.length > 100
                          ? `${entry.text.substring(0, 100)}...`
                          : entry.text}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {entry.voice}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {entry.speed}x
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {entry.format.toUpperCase()}
                        </Badge>
                        <span>
                          {formatDistanceToNow(entry.createdAt, {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <audio controls className="w-full h-10" src={entry.audioUrl}>
                    Your browser does not support the audio element.
                  </audio>
                </div>

                <div className="flex  gap-2">
                  <Button
                    onClick={() => downloadAudio(entry)}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(entry.id)}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

