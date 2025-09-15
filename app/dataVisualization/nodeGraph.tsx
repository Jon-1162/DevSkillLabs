/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import NodeGraphQueryBar from "../components/nodeGraphQueryBar"

import { nodeGraphFilter } from "@/lib/nodeGraphFilter";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});



type networkGraphData = {
  nodes: { id: string; volume: number }[]; links: { source: string; target: string; value: number }[];
}

function NetworkGraph({ nodes, links }: networkGraphData) {
  const fgRef = useRef<any>(null);

  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const [graphData, setGraphData] = useState<networkGraphData>({
    nodes,
    links,
  });

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force("charge").strength(-1000);
      fgRef.current.d3Force("link").distance(3000);
      fgRef.current.d3VelocityDecay(0.2);
    }
  }, []);

  useEffect(() => {
  if (!selectedSkill || selectedSkill === "All") {
    setGraphData({ nodes, links }); // reset to full graph
  } else {
    const filtered = nodeGraphFilter(selectedSkill, { nodes, links });
    console.log("Filtered Data:")
    console.log(filtered)
    setGraphData(filtered);
  }
}, [selectedSkill, nodes, links]);

  return (
    <Card className="w-1500px max-w-1100px mx-auto shadow-md border rounded-2xl">
      <CardHeader>
        <NodeGraphQueryBar nodes={nodes} links={links} onSkillChange={setSelectedSkill}/>
        <CardTitle className="text-xl font-semibold">{"-Node Graph Showing What Skills are the most related. The size of the nodes is their unweighted average and the edges are what skills occur alongside them in job descriptions. With thickness of edges showing how many times they co-occur. "}</CardTitle>
        <CardTitle className="text-xl font-semibold">{"-Try zooming by scrolling and pulling on a node by dragging : )"}</CardTitle>
      </CardHeader>
      <CardContent className="h-[600px]">
        <div className=" border-2 border-gray-400 rounded-md overflow-hidden">
          <ForceGraph2D
            ref={fgRef}
            graphData={graphData}
            nodeLabel={(node: any) => `${node.id} (${node.volume})`}
            nodeAutoColorBy="id"
            nodeCanvasObject={(node: any, ctx, globalScale) => {
              const size = 5 + node.volume * 0.3; // dynamic scaling
              ctx.beginPath();
              ctx.arc(node.x!, node.y!, size, 0, 2 * Math.PI, false);
              ctx.fillStyle = node.color;
              ctx.fill();

              // Label rendering
              const fontSize = 12 / globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "white";
              ctx.fillText(node.id, node.x!, node.y!);
            }}
            linkWidth={(link: any) => Math.sqrt(link.value)}
            linkColor={() => "rgba(0,0,0,0.3)"}
            width={1100} // ForceGraph explicit width
            height={600} // ForceGraph explicit height
          />
        </div>
      </CardContent>
    </Card>
  );
}


export default NetworkGraph