"use client";
import { BarChartVis } from "./barChart";
import NetworkGraph from "./nodeGraph";
import TreeMapChart from "./treeMap";

import barChartData from "../data/skillSetOccurrenceAZ_SWE_Aug.json"
import treeMapData from "../data/allSkillInstancesCountAZ_SWE_Aug.json";
import networkGraphData from "../data/coOccurrenceAZ_SWE_Aug.json";



export default function ScanStats() {
  return (
    <div className="mx-auto">
      <BarChartVis
        title="How many eggs per hour made by software maintainers"
        data={barChartData}
        color="#22c55e"
      />
      {/* \/Keep this here otherwise component breaks */}
      <div className="dont remove this"></div>
      {/* /\Keep this here otherwise component breaks */}
      <TreeMapChart data={treeMapData} />
      <NetworkGraph
        nodes={networkGraphData.nodes}
        links={networkGraphData.links}
      />
    </div>
  );
}
