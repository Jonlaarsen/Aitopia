"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, Trash2, FileText, Clock, Languages, Video, Music, Search, Filter } from "lucide-react";
import { useSpeechToTextStore } from "@/store/useSpeechToTextStore";
import { getTranscriptions } from "@/app/actions/text-actions";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { useState, useMemo, useEffect } from "react";

export default function TranscriptionsGallery() {
  const { transcriptions, removeTranscription, clearTranscriptions, addTranscription } = useSpeechToTextStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "audio" | "video">("all");
  const [sortBy, setSortBy] = useState<"date" | "name" | "title" | "size">("date");
  const [isLoading, setIsLoading] = useState(true);
  const [dbTranscriptions, setDbTranscriptions] = useState<any[]>([]);

  // Load transcriptions from database on component mount
  useEffect(() => {
    const loadTranscriptions = async () => {
      try {
        setIsLoading(true);
        const result = await getTranscriptions();
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

  const filteredTranscriptions = useMemo(() => {
    // Use database transcriptions if available, otherwise fall back to local store
    const sourceTranscriptions = dbTranscriptions.length > 0 ? dbTranscriptions : transcriptions;
    
    const filtered = sourceTranscriptions.filter(transcription => {
      const fileName = transcription.file_name || transcription.fileName;
      const text = transcription.text_content || transcription.text;
      const title = transcription.title;
      const description = transcription.description;
      const originalFileType = transcription.original_file_type || transcription.originalFileType;
      
      const matchesSearch = fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (title && title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (description && description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = filterType === "all" || 
                         originalFileType === filterType;
      
      return matchesSearch && matchesType;
    });

    // Sort transcriptions
    filtered.sort((a, b) => {
      const aFileName = a.file_name || a.fileName;
      const bFileName = b.file_name || b.fileName;
      const aTitle = a.title || aFileName;
      const bTitle = b.title || bFileName;
      const aTimestamp = a.created_at || a.timestamp;
      const bTimestamp = b.created_at || b.timestamp;
      const aFileSize = a.file_size || a.fileSize;
      const bFileSize = b.file_size || b.fileSize;
      
      switch (sortBy) {
        case "date":
          return new Date(bTimestamp).getTime() - new Date(aTimestamp).getTime();
        case "name":
          return aFileName.localeCompare(bFileName);
        case "title":
          return aTitle.localeCompare(bTitle);
        case "size":
          return bFileSize - aFileSize;
        default:
          return 0;
      }
    });

    return filtered;
  }, [dbTranscriptions, transcriptions, searchTerm, filterType, sortBy]);

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

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Loading Transcriptions
          </CardTitle>
          <CardDescription>
            Loading your transcriptions from the database...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50 animate-pulse" />
            <p>Loading transcriptions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (filteredTranscriptions.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            No Transcriptions
          </CardTitle>
          <CardDescription>
            You haven&apos;t created any transcriptions yet
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
              {filteredTranscriptions.length} of {dbTranscriptions.length || transcriptions.length} transcriptions
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
              {filteredTranscriptions.map((transcription) => {
                const fileName = transcription.file_name || transcription.fileName;
                const text = transcription.text_content || transcription.text;
                const title = transcription.title;
                const description = transcription.description;
                const timestamp = transcription.created_at || transcription.timestamp;
                const fileSize = transcription.file_size || transcription.fileSize;
                const language = transcription.language;
                const originalFileType = transcription.original_file_type || transcription.originalFileType;
                const model = transcription.model;
                
                return (
                  <Card key={transcription.id} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-medium truncate">
                            {title || fileName}
                          </CardTitle>
                          {title && title !== fileName && (
                            <p className="text-sm text-muted-foreground mt-1 truncate">
                              {fileName}
                            </p>
                          )}
                          {description && (
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{formatDistanceToNow(new Date(timestamp), { addSuffix: true })}</span>
                            <span>•</span>
                            <span>{formatFileSize(fileSize)}</span>
                            <span>•</span>
                            <Languages className="h-4 w-4" />
                            <span>{language === 'auto' ? 'Auto-detected' : language.toUpperCase()}</span>
                            {originalFileType && (
                              <>
                                <span>•</span>
                                {originalFileType === 'video' ? (
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
                          onClick={() => handleDownload(text, fileName)}
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
    </div>
  );
}
