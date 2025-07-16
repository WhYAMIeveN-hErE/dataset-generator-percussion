
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, CheckCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TextUploadProps {
  onBack: () => void;
}

const TextUpload = ({ onBack }: TextUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/plain") {
      setFile(selectedFile);
      toast({
        title: "File Selected",
        description: `${selectedFile.name} is ready for upload.`,
      });
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please select a valid text file (.txt).",
        variant: "destructive",
      });
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    
    toast({
      title: "Upload Successful!",
      description: "Your text file has been uploaded successfully.",
    });
  };

  const handleProcess = () => {
    toast({
      title: "Processing Started",
      description: "Your text file is being processed...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
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
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Text File Upload
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-md mx-auto">
            Upload your text file for processing and analysis
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
            <h3 className="font-semibold text-purple-800 mb-2">Instructions:</h3>
            <ul className="text-purple-700 space-y-1 text-sm">
              <li>• Ensure your text file is in UTF-8 encoding</li>
              <li>• File size should not exceed 5MB</li>
              <li>• Plain text format (.txt) is required</li>
              <li>• Remove any special formatting before upload</li>
            </ul>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Text File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
              <input
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                className="hidden"
                id="text-upload"
              />
              <label htmlFor="text-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-600 mb-2">
                  Click to upload your text file
                </p>
                <p className="text-sm text-gray-500">
                  or drag and drop it here
                </p>
              </label>
            </div>
            
            {file && (
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-800">{file.name}</span>
                <span className="text-sm text-purple-600">
                  ({(file.size / 1024).toFixed(2)} KB)
                </span>
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 font-semibold"
            >
              {isUploading ? "Uploading..." : "Upload File"}
            </Button>
            
            <Button
              onClick={handleProcess}
              disabled={!file}
              variant="outline"
              className="flex-1 h-12 border-2 font-semibold hover:bg-gray-50"
            >
              Process File
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TextUpload;
