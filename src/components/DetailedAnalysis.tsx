import React from 'react';
import { BusinessData } from '../lib/types';
import { Check, X } from 'lucide-react';

interface DetailedAnalysisProps {
  data: BusinessData;
}

export function DetailedAnalysis({ data }: DetailedAnalysisProps) {
  if (!data) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Analysis</h2>
      
      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Meta Information</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Title:</span> {data.metaTags.title || 'Not found'}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Description:</span> {data.metaTags.description || 'Not found'}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Keywords:</span> {data.metaTags.keywords?.join(', ') || 'Not found'}
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Social Media Presence</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(data.socialPresence).map(([platform, present]) => (
              <div key={platform} className="flex items-center space-x-2">
                {present ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <X className="w-5 h-5 text-red-500" />
                )}
                <span className="capitalize">{platform}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}