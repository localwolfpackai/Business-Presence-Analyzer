import React, { useState } from 'react';
import { AnalysisForm } from './components/AnalysisForm';
import { ResultsPanel } from './components/ResultsPanel';
import { analyzeBusiness } from './lib/utils';
import { Scan } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    try {
      const data = await analyzeBusiness(url);
      setAnalysisData(data);
    } catch (error) {
      console.error(error);
      // In a production app, we'd show a proper error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Scan className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Business Presence Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Evaluate and improve your online visibility with our comprehensive business presence analysis tool.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-12">
          <AnalysisForm onAnalyze={handleAnalyze} isLoading={isLoading} />
          
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
          ) : (
            <ResultsPanel data={analysisData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;