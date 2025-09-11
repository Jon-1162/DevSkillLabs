/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useQuery } from "../context/QueryContext";
import { BarChartVis } from "./barChart";
import TreeMapChart from "./treeMap";
import NetworkGraph from "./nodeGraph";

export default function ScanStats() {
  const { location, category, timeFrame } = useQuery();

  const [barChartData, setBarChartData] = useState<any | null>(null);
  const [treeMapData, setTreeMapData] = useState<any | null>(null);
  const [networkGraphData, setNetworkGraphData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location || !category || !timeFrame) return;

    const loadData = async () => {
      try {
        const data = await import(`../data/${category}${location}${timeFrame}.json`)
        console.log(`../data/${category}${location}${timeFrame}.json`)

        setBarChartData(data.skillCounts);
        setTreeMapData(data.treemapData);
        setNetworkGraphData(data.networkGraphData);
        setError(null);
      } catch (err) {
        console.error("Could not load JSON", err);
        setError("Data not available yet. Check back soon!");
        setBarChartData(null);
        setTreeMapData(null);
        setNetworkGraphData(null);
      }
    };

    loadData();
  }, [location, category, timeFrame]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!barChartData || !treeMapData || !networkGraphData) {
    
    return <p className="text-gray-500">Loading charts…</p>;
  }

  


  return (
    <div className="mx-auto">
      <BarChartVis
        title="In how many job descriptions a given skill appears. Unweighted count."
        data={barChartData}
        color="#22c55e"
      />
      <div className="dont remove this"></div>
      <TreeMapChart data={treeMapData} />
      <NetworkGraph nodes={networkGraphData.nodes} links={networkGraphData.links} />
    </div>
  );
}



// "use client";
// import { BarChartVis } from "./barChart";
// import NetworkGraph from "./nodeGraph";
// import TreeMapChart from "./treeMap";

// import barChartData from "../data/skillSetOccurrenceAZ_SWE_Aug.json"
// import treeMapData from "../data/allSkillInstancesCountAZ_SWE_Aug.json";
// import networkGraphData from "../data/coOccurrenceAZ_SWE_Aug.json";



// export default function ScanStats() {
//   return (
//     <div className="mx-auto">
//       <BarChartVis
//         title="In how many jobs descriptions a given skill appears. Even if theres multiple instances only 1 is counted. This is to provide an unweighted value."
//         data={barChartData}
//         color="#22c55e"
//       />
//       {/* \/Keep this here otherwise component breaks */}
//       <div className="dont remove this"></div>
//       {/* /\Keep this here otherwise component breaks */}
//       <TreeMapChart data={treeMapData} />
//       <NetworkGraph
//         nodes={networkGraphData.nodes}
//         links={networkGraphData.links}
//       />
//     </div>
//   );
// }
