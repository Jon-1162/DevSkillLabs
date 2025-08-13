"use client";

import * as React from "react";
import {
  Bar,
  BarChart as ReBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type BarChartProps = {
  title?: string;
  data: { name: string; value: number }[];
  color?: string;
};

export function BarChart({ title = "Bar Chart", data, color = "#3b82f6" }: BarChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart data={data} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} />
          </ReBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
