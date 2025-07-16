
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileSpreadsheet, FileText, Link, FolderOpen } from "lucide-react";
import CsvUpload from "@/components/CsvUpload";
import TextUpload from "@/components/TextUpload";
import UrlProcessor from "@/components/UrlProcessor";
import AudioDirectory from "@/components/AudioDirectory";

const Index = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [currentView, setCurrentView] = useState<string>("welcome");

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleProceed = () => {
    if (selectedOption) {
      setCurrentView(selectedOption);
    }
  };

  const handleBackToWelcome = () => {
    setCurrentView("welcome");
    setSelectedOption("");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "csv":
        return <CsvUpload onBack={handleBackToWelcome} />;
      case "text":
        return <TextUpload onBack={handleBackToWelcome} />;
      case "url":
        return <UrlProcessor onBack={handleBackToWelcome} />;
      case "audio":
        return <AudioDirectory onBack={handleBackToWelcome} />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center space-y-4 pb-8">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <FolderOpen className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to File Processor
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 max-w-md mx-auto">
                  Choose your preferred file type or input method to get started with processing your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 block">
                    Select Processing Type
                  </label>
                  <Select value={selectedOption} onValueChange={handleOptionSelect}>
                    <SelectTrigger className="w-full h-14 text-lg border-2 hover:border-blue-300 transition-colors">
                      <SelectValue placeholder="Choose your file type or input method" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2">
                      <SelectItem value="csv" className="py-4 cursor-pointer hover:bg-blue-50">
                        <div className="flex items-center space-x-3">
                          <FileSpreadsheet className="w-5 h-5 text-green-600" />
                          <span className="font-medium">CSV File</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="text" className="py-4 cursor-pointer hover:bg-blue-50">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">Text File</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="url" className="py-4 cursor-pointer hover:bg-blue-50">
                        <div className="flex items-center space-x-3">
                          <Link className="w-5 h-5 text-purple-600" />
                          <span className="font-medium">URL Processing</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="audio" className="py-4 cursor-pointer hover:bg-blue-50">
                        <div className="flex items-center space-x-3">
                          <FolderOpen className="w-5 h-5 text-orange-600" />
                          <span className="font-medium">Audio Directory</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={handleProceed}
                  disabled={!selectedOption}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Proceed to {selectedOption ? selectedOption.toUpperCase() : "Processing"}
                </Button>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return renderCurrentView();
};

export default Index;
