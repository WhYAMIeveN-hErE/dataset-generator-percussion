
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Upload, CheckCircle, ArrowLeft, Music } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AudioDirectoryProps {
  onBack: () => void;
}

const AudioDirectory = ({ onBack }: AudioDirectoryProps) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      // Check if all files are audio files
      const audioFiles = Array.from(selectedFiles).filter(file => 
        file.type.startsWith('audio/') || 
        file.name.endsWith('.mp3') || 
        file.name.endsWith('.wav') || 
        file.name.endsWith('.flac') || 
        file.name.endsWith('.m4a')
      );
      
      if (audioFiles.length === selectedFiles.length) {
        setFiles(selectedFiles);
        toast({
          title: "Files Selected",
          description: `${selectedFiles.length} audio file(s) ready for upload.`,
        });
      } else {
        toast({
          title: "Invalid File Types",
          description: "Please select only audio files (MP3, WAV, FLAC, M4A).",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!files) return;
    
    setIsUploading(true);
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsUploading(false);
    
    toast({
      title: "Upload Successful!",
      description: "Your audio directory has been uploaded successfully.",
    });
  };

  const handleProcess = () => {
    toast({
      title: "Processing Started",
      description: "Your audio files are being processed...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="self-start flex items-center space-x-2 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Welcome</span>
          </Button>
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center mb-4">
            <Music className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Audio Directory
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-md mx-auto">
            Upload multiple audio files from your directory for batch processing
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
            <h3 className="font-semibold text-amber-800 mb-2">Instructions:</h3>
            <ul className="text-amber-700 space-y-1 text-sm">
              <li>• Select multiple audio files (MP3, WAV, FLAC, M4A)</li>
              <li>• Maximum file size: 50MB per file</li>
              <li>• Supported sample rates: 8kHz to 192kHz</li>
              <li>• Processing time depends on file count and size</li>
            </ul>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Audio Files
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-amber-400 transition-colors">
              <input
                type="file"
                accept="audio/*,.mp3,.wav,.flac,.m4a"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="audio-upload"
              />
              <label htmlFor="audio-upload" className="cursor-pointer">
                <FolderOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-600 mb-2">
                  Click to select audio files
                </p>
                <p className="text-sm text-gray-500">
                  You can select multiple files at once
                </p>
              </label>
            </div>
            
            {files && (
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <CheckCircle className="w-5 h-5 text-amber-600" />
                  <span className="font-medium text-amber-800">
                    {files.length} file(s) selected
                  </span>
                </div>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {Array.from(files).map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded border text-sm">
                      <span className="font-medium text-gray-700">{file.name}</span>
                      <span className="text-gray-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={handleUpload}
              disabled={!files || isUploading}
              className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 font-semibold"
            >
              {isUploading ? "Uploading..." : "Upload Directory"}
            </Button>
            
            <Button
              onClick={handleProcess}
              disabled={!files}
              variant="outline"
              className="flex-1 h-12 border-2 font-semibold hover:bg-gray-50"
            >
              Process Files
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AudioDirectory;
