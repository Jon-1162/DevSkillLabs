"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

const data = {
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

export default function NetworkGraph() {
  const fgRef = useRef<any>(null);

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force("charge").strength(-200); // spacing
      fgRef.current.d3VelocityDecay(0.2);
    }
  }, []);

  return (
    <Card className="w-1500px max-w-1100px mx-auto shadow-md border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{"title"}</CardTitle>
      </CardHeader>
      <CardContent className="h-[600px]">
        <div className=" border-2 border-gray-400 rounded-md overflow-hidden">
          <ForceGraph2D
            ref={fgRef}
            graphData={data}
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
