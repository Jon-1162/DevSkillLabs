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

  const treeMapData = [
  {
    name: 'Category A',
    children: [
      { name: 'Item A1', size: 100, color: '#ff6b6b' },
      { name: 'Item A2', size: 150, color: '#4ecdc4' },
      { name: 'Item B1', size: 200, color: '#45b7d1' },
      { name: 'Item B2', size: 50, color: '#f9ca24' },
      { name: 'Item B3', size: 75, color: '#6c5ce7' },
    ],
  },

];

const networkGraphData = {
  nodes: [
    { id: "Math", volume: 50 },
    { id: "Science", volume: 30 },
    { id: "History", volume: 20 },
    { id: "Art", volume: 10 },
    { id: "Programming", volume: 60 },
    { id: "Robotics", volume: 25 },
  ],
  links: [
    { source: "Math", target: "Science", value: 5 },
    { source: "Math", target: "Programming", value: 15 },
    { source: "Science", target: "Programming", value: 10 },
    { source: "History", target: "Art", value: 3 },
    { source: "Programming", target: "Robotics", value: 20 },
    { source: "Science", target: "Robotics", value: 7 },
  ],
};

  return (
    <div className=" mx-auto">
      <BarChartVis title="How many eggs per hour made by software maintainers" data={barChartData} color="#22c55e" />
      {/* \/Keep this here otherwise component breaks */}
      <div className=" dont remove this"></div> 
      {/* /\Keep this here otherwise component breaks */}
      <TreeMapChart data={treeMapData} />
      <NetworkGraph nodes= {networkGraphData.nodes} links={networkGraphData.links}/>
      
    </div>
  );
}
