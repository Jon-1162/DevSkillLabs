"use client";

import dynamic from "next/dynamic";
import React from "react";

const ForceGraph2D = dynamic(() => import("react-force-graph").then(mod => mod.ForceGraph2D), { ssr: false });

export default function NetworkGraph() {
  const data = {
    nodes: [
      { id: "React", volume: 120 },
      { id: "Next.js", volume: 80 },
      { id: "Node.js", volume: 100 },
      { id: "Django", volume: 70 }
    ],
    links: [
      { source: "React", target: "Next.js", value: 0.9 },
      { source: "Next.js", target: "Node.js", value: 0.7 },
      { source: "Node.js", target: "Django", value: 0.3 }
    ]
  };

  return (
    <div className="w-full h-[600px] border rounded-lg shadow">
      <ForceGraph2D
        graphData={data}
        nodeAutoColorBy="id"
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, Math.sqrt(node.volume) * 2, 0, 2 * Math.PI, false);
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.fillText(label, node.x!, node.y!);
        }}
        linkWidth={(link: any) => link.value * 2}
        linkColor={() => "#999"}
      />
    </div>
  );
}
