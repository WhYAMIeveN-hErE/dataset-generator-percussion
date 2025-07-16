
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, ArrowLeft, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UrlProcessorProps {
  onBack: () => void;
}

const UrlProcessor = ({ onBack }: UrlProcessorProps) => {
  const [url, setUrl] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleProcess = async () => {
    if (!url || !startTime || !endTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before processing.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    
    toast({
      title: "Processing Complete!",
      description: "Your URL has been processed successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
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
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4">
            <Link className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            URL Processing
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-md mx-auto">
            Process content from a URL with specific time parameters
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="bg-pink-50 border-l-4 border-pink-400 p-4 rounded-r-lg">
            <h3 className="font-semibold text-pink-800 mb-2">Instructions:</h3>
            <ul className="text-pink-700 space-y-1 text-sm">
              <li>• Enter a valid URL (http:// or https://)</li>
              <li>• Specify start and end times in seconds</li>
              <li>• End time must be greater than start time</li>
              <li>• Processing may take a few minutes depending on content size</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-sm font-medium text-gray-700">
                URL
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/video"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-12 text-lg border-2 focus:border-purple-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Start Time (seconds)</span>
                </Label>
                <Input
                  id="startTime"
                  type="number"
                  placeholder="0"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="h-12 text-lg border-2 focus:border-purple-400"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>End Time (seconds)</span>
                </Label>
                <Input
                  id="endTime"
                  type="number"
                  placeholder="60"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="h-12 text-lg border-2 focus:border-purple-400"
                  min="1"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleProcess}
            disabled={!url || !startTime || !endTime || isProcessing}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isProcessing ? "Processing URL..." : "Process URL"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UrlProcessor;
