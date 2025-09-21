/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import CytoscapeNodeGraph from "./cytoscapeNodeGraph";

// Use the new Cytoscape-based component
const NetworkGraph = dynamic(() => Promise.resolve(CytoscapeNodeGraph), {
  ssr: false,
  loading: () => (
    <div className=" max-w-4xl mx-auto border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-lg">
      <div className="h-[700px] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600 dark:text-gray-400">Loading advanced network visualization...</span>
        </div>
      </div>
    </div>
  )
});

// Simple wrapper component that uses the new Cytoscape implementation
interface NetworkGraphProps {
  nodes: { id: string; volume: number }[];
  links: { source: string; target: string; value: number }[];
  title?: string;
}

function NetworkGraphWrapper({ nodes, links, title }: NetworkGraphProps) {
  return <NetworkGraph nodes={nodes} links={links} title={title} />;
}

export default NetworkGraphWrapper;