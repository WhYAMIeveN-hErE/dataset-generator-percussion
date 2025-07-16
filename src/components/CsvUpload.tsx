
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, Upload, CheckCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CsvUploadProps {
  onBack: () => void;
}

const CsvUpload = ({ onBack }: CsvUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      toast({
        title: "File Selected",
        description: `${selectedFile.name} is ready for upload.`,
      });
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please select a valid CSV file.",
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
      description: "Your CSV file has been uploaded successfully.",
    });
  };

  const handleProcess = () => {
    toast({
      title: "Processing Started",
      description: "Your CSV file is being processed...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
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
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
            <FileSpreadsheet className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            CSV File Upload
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-md mx-auto">
            Upload your CSV file for processing and analysis
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• Ensure your CSV file is properly formatted</li>
              <li>• File size should not exceed 10MB</li>
              <li>• First row should contain column headers</li>
              <li>• Use comma as delimiter</li>
            </ul>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Select CSV File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-600 mb-2">
                  Click to upload your CSV file
                </p>
                <p className="text-sm text-gray-500">
                  or drag and drop it here
                </p>
              </label>
            </div>
            
            {file && (
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">{file.name}</span>
                <span className="text-sm text-green-600">
                  ({(file.size / 1024).toFixed(2)} KB)
                </span>
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="flex-1 h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-semibold"
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

export default CsvUpload;
