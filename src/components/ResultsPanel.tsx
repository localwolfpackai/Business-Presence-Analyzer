import React from 'react';
import { Globe, Star, Share2, Search } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { DetailedAnalysis } from './DetailedAnalysis';
import { BusinessData } from '../lib/types';

interface ResultsPanelProps {
  data: BusinessData | null;
}

export function ResultsPanel({ data }: ResultsPanelProps) {
  if (!data) return null;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Online Visibility"
          value={`${data.visibility}%`}
          icon={<Globe className="w-6 h-6" />}
          trend={data.visibility > 70 ? 'up' : 'down'}
        />
        <MetricCard
          title="Social Profiles"
          value={data.directories}
          icon={<Share2 className="w-6 h-6" />}
          trend={data.directories > 2 ? 'up' : 'down'}
        />
        <MetricCard
          title="SEO Score"
          value={`${data.seoScore}%`}
          icon={<Search className="w-6 h-6" />}
          trend={data.seoScore > 80 ? 'up' : 'down'}
        />
      </div>
      
      <DetailedAnalysis data={data} />
    </div>
  );
}