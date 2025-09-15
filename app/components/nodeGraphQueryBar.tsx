"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Keyboard , Search } from "lucide-react";
import { useState } from "react";

type Node = { id: string; volume: number };
type Link = { source: string; target: string; value: number };

type NetworkGraphData = {
  nodes: Node[];
  links: Link[];
};

type NodeQueryBarProps = NetworkGraphData & {
  onSkillChange: (skill: string) => void; // 🔹 callback prop
};


function renderSkillOptions(nodes: Node[]) {
  return [...nodes] 
    .sort((a, b) => b.volume - a.volume) 
    .map((node) => (
      <SelectItem key={node.id} value={node.id}>
        <div className="flex items-center gap-2">
          <Keyboard size={16} />
          <span>
            {node.id} ({node.volume})
          </span>
        </div>
      </SelectItem>
    ));
}


export default function NodeQueryBar({ nodes, onSkillChange }: NodeQueryBarProps) {
  const [skill, setSkill] = useState("");

  const handleChange = (value: string) => {
    setSkill(value);
    onSkillChange(value); 
  };


  return (
    <div className="flex justify-center">
      <div className="flex w-25%S max-w-4xl gap-2 p-4 bg-white rounded-xl shadow-md items-center">
        <div>See a Skills First Neighbors:</div>
        {/* Skills dropdown */}
        <Select value={skill} onValueChange={handleChange}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select a Skill" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">
              <div className="flex items-center gap-2">
                <Keyboard size={16} />
                <span>All</span>
              </div>
            </SelectItem>
            {renderSkillOptions(nodes)}
          </SelectContent>
        </Select>

        {/* Search button
        <Button className="h-10">
          <Search size={16} className="mr-2" />
          See Immi
        </Button> */}
      </div>
    </div>
  );
}
 