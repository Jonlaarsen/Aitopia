"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, Trash2, FileText, Clock, Languages, Video, Music, Search, Filter } from "lucide-react";
import { useSpeechToTextStore } from "@/store/useSpeechToTextStore";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { useState, useMemo } from "react";

export default function TranscriptionsGallery() {
  const { transcriptions, removeTranscription, clearTranscriptions } = useSpeechToTextStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "audio" | "video">("all");
  const [sortBy, setSortBy] = useState<"date" | "name" | "title" | "size">("date");

  const filteredTranscriptions = useMemo(() => {
    let filtered = transcriptions.filter(transcription => {
      const matchesSearch = transcription.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transcription.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (transcription.title && transcription.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (transcription.description && transcription.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = filterType === "all" || 
                         transcription.originalFileType === filterType;
      
      return matchesSearch && matchesType;
    });

    // Sort transcriptions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case "name":
          return a.fileName.localeCompare(b.fileName);
        case "title":
          const titleA = a.title || a.fileName;
          const titleB = b.title || b.fileName;
          return titleA.localeCompare(titleB);
        case "size":
          return b.fileSize - a.fileSize;
        default:
          return 0;
      }
    });

    return filtered;
  }, [transcriptions, searchTerm, filterType, sortBy]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Text copied to clipboard");
    } catch {
      toast.error("Failed to copy text");
    }
  };

  const handleDownload = (text: string, fileName: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName.replace(/\.[^/.]+$/, '')}_transcription.txt`;
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

  const handleClearAll = () => {
    if (confirm("Are you sure you want to delete all transcriptions? This action cannot be undone.")) {
      clearTranscriptions();
      toast.success("All transcriptions cleared");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (transcriptions.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            No Transcriptions
          </CardTitle>
          <CardDescription>
            You haven't created any transcriptions yet
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No transcriptions found</p>
            <p className="text-sm">Go to Speech-to-Text to create your first transcription</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Search and Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transcriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">File Type</label>
              <Select value={filterType} onValueChange={(value: "all" | "audio" | "video") => setFilterType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="audio">Audio Only</SelectItem>
                  <SelectItem value="video">Video Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select value={sortBy} onValueChange={(value: "date" | "name" | "size") => setSortBy(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (Newest)</SelectItem>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="size">Size (Largest)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredTranscriptions.length} of {transcriptions.length} transcriptions
            </p>
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transcriptions List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            All Transcriptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="space-y-4">
              {filteredTranscriptions.map((transcription) => (
                <Card key={transcription.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-medium truncate">
                          {transcription.title || transcription.fileName}
                        </CardTitle>
                        {transcription.title && transcription.title !== transcription.fileName && (
                          <p className="text-sm text-muted-foreground mt-1 truncate">
                            {transcription.fileName}
                          </p>
                        )}
                        {transcription.description && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {transcription.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{formatDistanceToNow(new Date(transcription.timestamp), { addSuffix: true })}</span>
                          <span>•</span>
                          <span>{formatFileSize(transcription.fileSize)}</span>
                          <span>•</span>
                          <Languages className="h-4 w-4" />
                          <span>{transcription.language === 'auto' ? 'Auto-detected' : transcription.language.toUpperCase()}</span>
                          {transcription.originalFileType && (
                            <>
                              <span>•</span>
                              {transcription.originalFileType === 'video' ? (
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
                        onClick={() => handleDownload(transcription.text, transcription.fileName)}
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
    </div>
  );
}
