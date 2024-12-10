import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../lib/utils';

interface AnalysisFormProps {
  onAnalyze: (url: string) => Promise<void>;
  isLoading: boolean;
}

export function AnalysisForm({ onAnalyze, isLoading }: AnalysisFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) onAnalyze(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter business website URL"
          className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md",
            "bg-blue-600 text-white hover:bg-blue-700 transition-colors",
            "disabled:bg-blue-400 disabled:cursor-not-allowed"
          )}
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}