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
        title="In how many jobs descriptions a given skill appears. Even if theres multiple instances only 1 is counted. This is to provide an unweighted value."
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
