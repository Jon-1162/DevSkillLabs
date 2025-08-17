"use client"; 
import { BarChartVis } from "./barChart";
import NetworkGraph from "./nodeGraph";
import { TreeMapChart } from "./treeMap";



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
  ];

  const treeMapData = [
    { name: "Frontend", value: 350 },
    { name: "Backend", value: 420 },
    { name: "Full Stack", value: 250 },
    { name: "Data Science", value: 180 },
    { name: "DevOps", value: 140 },
    { name: "Mobile", value: 120 }
  ];

  return (
    <div className=" mx-auto">
      {/* <BarChartVis title="Skill Demand" data={barChartData} color="#22c55e" />   */}
      {/* <NetworkGraph /> */}
      {/* <TreeMapChart data={treeMapData}/> */}
    </div>
  );
}
