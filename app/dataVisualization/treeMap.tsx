"use client";

import * as React from "react";
import {
  Treemap,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TreeMapNode = {
  name: string;
  size?: number;
  children?: TreeMapNode[];
};

type TreeMapChartProps = {
  title?: string;
  data: TreeMapNode[];
  colorRange?: string[]; // optional custom colors
};

export function TreeMapChart({
  title = "Treemap",
  data,
  colorRange = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"],
}: TreeMapChartProps) {
  // Flatten to apply colors consistently
  const colorMap = new Map<string, string>();
  let colorIndex = 0;

  const assignColors = (nodes: TreeMapNode[]) => {
    nodes.forEach((node) => {
      if (!colorMap.has(node.name)) {
        colorMap.set(node.name, colorRange[colorIndex % colorRange.length]);
        colorIndex++;
      }
      if (node.children) assignColors(node.children);
    });
  };

  assignColors(data);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
            content={(props) => {
              const { x, y, width, height, name, value } = props as any;
              return (
                <g>
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    style={{
                      fill: colorMap.get(name) || "#ccc",
                      stroke: "#fff",
                      strokeWidth: 1,
                    }}
                  />
                  {width > 40 && height > 20 && (
                    <>
                      <text
                        x={x + 4}
                        y={y + 16}
                        fill="#fff"
                        fontSize={12}
                        fontWeight="bold"
                      >
                        {name}
                      </text>
                      {value && (
                        <text
                          x={x + 4}
                          y={y + 32}
                          fill="#fff"
                          fontSize={11}
                        >
                          {value}
                        </text>
                      )}
                    </>
                  )}
                </g>
              );
            }}
          >
            <Tooltip />
          </Treemap>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
