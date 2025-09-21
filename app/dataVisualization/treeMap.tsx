/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the type for individual items within categories
interface TreemapItem {
  name: string;
  size: number;
  color?: string; // Optional color property
  [key: string]: any; // Index signature to match Recharts requirements
}

// Define the type for categories that contain items
interface TreemapCategory {
  name: string;
  children: TreemapItem[];
  [key: string]: any; // Index signature to match Recharts requirements
}

// Define the props interface for the component
interface TreeMapChartProps {
  data: TreemapCategory[];
  title?: string;
}

const TreeMapChart: React.FC<TreeMapChartProps> = ({ data, title = "Skill Distribution by Category" }) => {
  // Modern gradient color palette
  const gradientColors = [
    '#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b',
    '#ef4444', '#ec4899', '#6366f1', '#14b8a6', '#84cc16',
    '#f97316', '#ef4444', '#a855f7', '#06b6d4', '#22c55e'
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4">
          <p className="font-semibold text-gray-900 dark:text-white text-lg">{data.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            <span className="font-medium">Total Instances:</span> {data.size}
          </p>
          {data.color && (
            <div className="flex items-center gap-2 mt-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: data.color }}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400">Category Color</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom content function to render each rectangle with modern styling
  const renderCustomizedContent = (props: any) => {
    const { root, depth, x, y, width, height, index, name, color, size } = props;
    
    // Use the color from data, or fallback to gradient palette
    const fillColor = color || gradientColors[index % gradientColors.length];
    
    // Calculate opacity based on size for visual hierarchy
    const safeSize = Number.isFinite(size) ? size : 0;
    const maxSize = Math.max(1, ...data.flatMap(cat => cat.children).map(item => Number.isFinite(item.size) ? item.size : 0));
    const opacity = 0.6 + (safeSize / maxSize) * 0.4; // Range from 0.6 to 1.0
    
    // Only show text if the rectangle is large enough
    const shouldShowText = width > 60 && height > 25;
    const fontSize = Math.min(width / 10, height / 5, 16);
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: fillColor,
            stroke: '#ffffff',
            strokeWidth: 2,
            opacity: opacity,
            transition: 'all 0.2s ease-in-out',
          }}
          className="hover:opacity-100 hover:stroke-2"
        />
        {shouldShowText && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={fontSize}
            fill="#ffffff"
            fontWeight="600"
            className="drop-shadow-sm"
            style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            {name}
          </text>
        )}
        {/* Show size for very large rectangles */}
        {shouldShowText && width > 100 && (
          <text
            x={x + width / 2}
            y={y + height / 2 + fontSize + 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={fontSize * 0.7}
            fill="#ffffff"
            fontWeight="500"
            className="drop-shadow-sm"
            style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            {size}
          </text>
        )}
      </g>
    );
  };

  // Calculate total skills and categories for display
  const totalSkills = useMemo(() => {
    return data.reduce((total, category) => total + category.children.length, 0);
  }, [data]);

  const totalInstances = useMemo(() => {
    return data.reduce((total, category) => 
      total + category.children.reduce((catTotal, skill) => catTotal + skill.size, 0), 0
    );
  }, [data]);

  return (
    <Card className="lg:max-w-4xl w-full mx-auto border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          {title}
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
          Showing {totalSkills} skills across {data.length} categories • {totalInstances} total instances
        </p>
      </CardHeader>
      <CardContent className="h-[500px] px-6">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#ffffff"
            content={renderCustomizedContent}
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TreeMapChart;














// "use client";

// import React from 'react';
// import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';

// // Define the type for individual items within categories
// interface TreemapItem {
//   name: string;
//   size: number;
//   [key: string]: any; // Index signature to match Recharts requirements
// }

// // Define the type for categories that contain items
// interface TreemapCategory {
//   name: string;
//   children: TreemapItem[];
//   [key: string]: any; // Index signature to match Recharts requirements
// }

// // Define the props interface for the component
// interface TreeMapChartProps {
//   data: TreemapCategory[];
// }

// const TreeMapChart: React.FC<TreeMapChartProps> = ({ data }) => {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <Treemap
//         data={data}
//         dataKey="size"
//         aspectRatio={4 / 3}
//         stroke="#fff"
//         fill="#aad884ff"
//       >
//         <Tooltip />
//       </Treemap>
//     </ResponsiveContainer>
//   );
// };

// export default TreeMapChart;


// // export function TreeMapChart({
// //   title = "Treemap",
// //   data,
// //   colorRange = [
// //     "#3b82f6",
// //     "#22c55e",
// //     "#f59e0b",
// //     "#ef4444",
// //     "#d244efff",
// //     "#c1ef44ff",
// //     "#ffc400ff",
// //     "#db6868ff",
// //   ],
