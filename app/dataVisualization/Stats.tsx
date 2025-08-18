"use client";
import { BarChartVis } from "./barChart";
import NetworkGraph from "./nodeGraph";
import TreeMapChart from "./treeMap";

export default function ScanStats() {
  const barChartData = [
    { name: "JavaScript", value: 120 },
    { name: "Python", value: 150 },
    { name: "Java", value: 100 },
    { name: "C#", value: 80 },
    { name: "TypeScript", value: 90 },
    { name: "Go", value: 60 },
    { name: "Rust", value: 40 },
    { name: "JavaScript", value: 120 },
    { name: "Python", value: 150 },
    { name: "Java", value: 100 },
    { name: "C#", value: 80 },
    { name: "TypeScript", value: 90 },
    { name: "Go", value: 60 },
    { name: "Rust", value: 40 },
    { name: "TypeScript", value: 90 },
    { name: "Go", value: 60 },
    { name: "Rust", value: 40 },
    { name: "JavaScript", value: 120 },
    { name: "Python", value: 150 },
    { name: "Java", value: 100 },
    { name: "C#", value: 80 },
    { name: "TypeScript", value: 90 },
    { name: "Go", value: 60 },
    { name: "Rust", value: 40 },
  ];

  const treemapData = [
  {
    name: 'Category A',
    children: [
      { name: 'Item A1', size: 100, color: '#ff6b6b' },
      { name: 'Item A2', size: 150, color: '#4ecdc4' },
    ],
  },
  {
    name: 'Category B',
    children: [
      { name: 'Item B1', size: 200, color: '#45b7d1' },
      { name: 'Item B2', size: 50, color: '#f9ca24' },
      { name: 'Item B3', size: 75, color: '#6c5ce7' },
    ],
  },
];

  return (
    <div className=" mx-auto">
      <BarChartVis title="How many jobs want a given skill" data={barChartData} color="#22c55e" />
      {/* \/Keep this here otherwise component breaks */}
      <div className=" dont remove this"></div> 
      {/* /\Keep this here otherwise component breaks */}
      <TreeMapChart data={treemapData} />
      <NetworkGraph />
    </div>
  );
}
