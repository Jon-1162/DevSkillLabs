"use client";

import React from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';

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
}

const TreeMapChart: React.FC<TreeMapChartProps> = ({ data }) => {
  // Fallback color palette for items without specified colors
  const defaultColors = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1',
    '#d084d0', '#ffb347', '#87ceeb', '#dda0dd', '#98fb98',
    '#f0e68c', '#ff6347', '#40e0d0', '#ee82ee', '#90ee90'
  ];

  // Custom content function to render each rectangle with different colors
  const renderCustomizedContent = (props: any) => {
    const { root, depth, x, y, width, height, index, name, color } = props;
    
    // Use the color from data, or fallback to default palette
    const fillColor = color || defaultColors[(depth * 10 + index) % defaultColors.length];
    
    return (
      
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: fillColor,
            stroke: '#fff',
            strokeWidth: 2,
          }}
        />
        {/* Only show text if the rectangle is large enough */}
        {width > 50 && height > 20 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={Math.min(width / 8, height / 4, 14)}
            fill="#fff"
            fontWeight="bold"
          >
            {name}
          </text>
        )}
      </g>
    );
  };

  return (
    <div>
    <p>How many times a skilled appeared in total counting all instances of a given skill</p>
    <ResponsiveContainer width="100%" height={400}>
      
      <Treemap
        data={data}
        dataKey="size"
        aspectRatio={4 / 3}
        stroke="#fff"
        content={renderCustomizedContent}
      >
        <Tooltip />
      </Treemap>
    </ResponsiveContainer>
    </div>
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
//   color?: string; // Optional color property
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
//         fill="#8884d8"
//       >
//         <Tooltip />
//       </Treemap>
//     </ResponsiveContainer>
//   );
// };

// export default TreeMapChart;


















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
