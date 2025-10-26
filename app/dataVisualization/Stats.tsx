/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useQuery } from "../context/QueryContext";
import { BarChartVis } from "./barChart";
import TreeMapChart from "./treeMap";
import NetworkGraph from "./nodeGraph";
import { getJobData } from "../services/getJobData";

export default function ScanStats() {
  const { location, experience, category, timeFrame, fanng } = useQuery();

  const [barChartData, setBarChartData] = useState<any | null>(null);
  const [treeMapData, setTreeMapData] = useState<any | null>(null);
  const [networkGraphData, setNetworkGraphData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);


  console.log("ScanStats - Current query values:", {
    location,
    experience,
    category,
    timeFrame,
    fanng,
  });
  

  useEffect(() => {
    if (!location || !category || !timeFrame) return;

    const loadData = async () => {

      try {
        // console.log("DEBUG | in loadData top of try")
        let filename = "Software_EngineerUnited_States9-2025.json"


        if (timeFrame == "9-2025") {
          filename = `${category}${location}${timeFrame}.json`;
          console.log(`Loading data from: 9-2025`);
        } else {
          console.log(`Loading data from 10-2025 and onwards`);
          filename = `${category}${experience}${location}${timeFrame}.json`;
        }

        if (fanng !== "All US Companies (default)") {
          console.log("LoadingFANNG data");
          filename = `Software_EngineerMid${fanng}${timeFrame}.json`;
        }




        console.log(`Filename before query is ${filename} `)
        let data = await import(
          `../data/Software_EngineerMidUnited_States10-2025.json`
        );

        if (filename != "Software_EngineerMidUnited_States10-2025.json") {
          console.log("DEBUG | attemptinggetJobData filename: " + filename)
          data = await getJobData(filename);
        }

        console.log("Setting job data ${category}${location}${timeFrame}.json");

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
  }, [location, category, timeFrame, experience, fanng]);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <p className="text-gray-600 dark:text-gray-400">
          Please select a role, location, and time period to view analytics.
        </p>
      </div>
    );
  }

  if (!location || !category || !timeFrame) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Select Your Criteria
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Choose a job role, location, and time period above to view detailed
          analytics.
        </p>
      </div>
    );
  }

  if (!barChartData || !treeMapData || !networkGraphData) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">
          Enter a job role, location, and time period to view analytics…
        </p>
      </div>
    );
  }

   if (!barChartData || !treeMapData || !networkGraphData) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">
          Loading Analytics…
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-14">
      <BarChartVis
        title="In how many job descriptions a given skill appears. Unweighted count."
        data={barChartData}
        color="#22c55e"
        maxItems={15}
      />
      <div className="dont remove this space-y-14"></div>
      <TreeMapChart data={treeMapData} />
      <NetworkGraph
        nodes={networkGraphData.nodes}
        links={networkGraphData.links}
      />
    </div>
  );
}