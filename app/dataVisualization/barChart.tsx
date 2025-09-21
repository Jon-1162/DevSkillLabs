"use client";

import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

type BarChartProps = {
  title?: string;
  data: { name: string; value: number }[];
  color?: string;
  maxItems?: number;
};

// Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="font-semibold text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Job Descriptions:</span> {payload[0].value}
        </p>
        <p className="text-xs text-gray-500">
          {payload[0].value === 1 ? '1 job description' : `${payload[0].value} job descriptions`}
        </p>
      </div>
    );
  }
  return null;
};

// Helper function to get gradient color based on value
const getGradientColor = (value: number, maxValue: number) => {
  const intensity = value / maxValue;
  if (intensity > 0.7) return '#10b981'; // High - emerald-500
  if (intensity > 0.4) return '#3b82f6'; // Medium - blue-500
  if (intensity > 0.2) return '#f59e0b'; // Low - amber-500
  return '#6b7280'; // Very low - gray-500
};

export function BarChartVis({
  title = "Bar Chart",
  data,
  color = "#22c55e",
  maxItems = 15,
}: BarChartProps) {
  const [isOthersExpanded, setIsOthersExpanded] = useState(false);
  
  // Process data to show top N skills + Others category
  const { processedData, othersSkills } = useMemo(() => {
    if (!data || data.length === 0) return { processedData: [], othersSkills: [] };

    // Sort by value (descending) and take top N
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    const topSkills = sortedData.slice(0, maxItems);
    const othersSkills = sortedData.slice(maxItems);
    
    // Calculate Others category
    const othersValue = othersSkills.reduce((sum, item) => sum + item.value, 0);
    
    // Add Others category if there are remaining skills
    const result = [...topSkills];
    if (othersValue > 0) {
      result.push({
        name: `Others (${othersSkills.length} skills)`,
        value: othersValue,
      });
    }
    
    return { processedData: result, othersSkills };
  }, [data, maxItems]);

  return (
    <Card className="lg:max-w-4xl  p-0 w-full mx-auto border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          {title}
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
          Showing top {Math.min(maxItems, data?.length || 0)} skills by frequency
        </p>
      </CardHeader>
      <CardContent className="h-[500px] p-0 lg:px-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={processedData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            barCategoryGap="10%"
          >
            <CartesianGrid 
              stroke="#e5e7eb" 
              strokeDasharray="3 3" 
              strokeOpacity={0.3}
            />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              tick={{ 
                fontSize: 12, 
                fill: '#6b7280',
                fontWeight: 500
              }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ 
                fontSize: 12, 
                fill: '#6b7280',
                fontWeight: 500
              }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
              label={{ 
                value: 'Job Descriptions', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#6b7280', fontWeight: 600 }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
            >
              {processedData.map((entry, index) => {
                const maxValue = Math.max(...processedData.map(item => item.value));
                const color = getGradientColor(entry.value, maxValue);
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      
      {/* Expandable Others Skills Section */}
      {othersSkills.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsOthersExpanded(!isOthersExpanded)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm lg:text-lg font-semibold text-gray-900 dark:text-white">
                Other Skills ({othersSkills.length} total)
              </span>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                Click to {isOthersExpanded ? 'hide' : 'view'} all remaining skills
              </span>
            </div>
            {isOthersExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          
          {isOthersExpanded && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {othersSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {skill.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                      {skill.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}