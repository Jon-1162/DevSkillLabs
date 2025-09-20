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
import { Badge } from "@/components/ui/badge";
import { 
  Keyboard, 
  Search, 
  Filter, 
  Network, 
  TrendingUp,
  X,
  ChevronDown
} from "lucide-react";
import { useState, useMemo } from "react";

type Node = { 
  id: string; 
  volume: number; 
  category?: string; 
  group?: number;
};

type Link = { 
  source: string; 
  target: string; 
  value: number; 
  strength?: number;
};

type NetworkGraphData = {
  nodes: Node[];
  links: Link[];
};

type NodeQueryBarProps = NetworkGraphData & {
  onSkillChange: (skill: string) => void;
};

// Color mapping for categories
const categoryColors = {
  'Programming Languages': 'bg-blue-100 text-blue-800 border-blue-200',
  'Frameworks': 'bg-purple-100 text-purple-800 border-purple-200',
  'Databases': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  'Cloud/DevOps': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Tools': 'bg-amber-100 text-amber-800 border-amber-200',
  'Other': 'bg-red-100 text-red-800 border-red-200',
};

function renderSkillOptions(nodes: Node[], searchTerm: string = "") {
  const filteredNodes = nodes.filter(node => 
    node.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return filteredNodes
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 50) // Limit to top 50 for performance
    .map((node) => (
      <SelectItem key={node.id} value={node.id} className="py-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              node.category ? categoryColors[node.category as keyof typeof categoryColors]?.split(' ')[0] : 'bg-gray-400'
            }`} />
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">{node.id}</span>
              <span className="text-xs text-gray-500">
                {node.category || 'Other'} • {node.volume} occurrences
              </span>
            </div>
          </div>
          <Badge variant="secondary" className="ml-2">
            {node.volume}
          </Badge>
        </div>
      </SelectItem>
    ));
}

export default function NodeQueryBar({ nodes, onSkillChange }: NodeQueryBarProps) {
  const [skill, setSkill] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalNodes = nodes.length;
    const totalVolume = nodes.reduce((sum, node) => sum + node.volume, 0);
    const avgVolume = Math.round(totalVolume / totalNodes);
    const topSkill = nodes.reduce((max, node) => node.volume > max.volume ? node : max, nodes[0]);
    
    return { totalNodes, avgVolume, topSkill };
  }, [nodes]);

  const handleChange = (value: string) => {
    setSkill(value);
    onSkillChange(value);
  };

  const handleClear = () => {
    setSkill("");
    setSearchTerm("");
    onSkillChange("All");
  };

  const isFiltered = skill && skill !== "All";

  return (
    <div className="w-full mx-auto">
      {/* Main Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Left side - Filter controls */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-600 dark:text-gray-400" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  Filter Skills Network
                </span>
              </div>
              {isFiltered && (
                <Badge 
                  variant="secondary" 
                  className="bg-blue-100 text-blue-800 border-blue-200"
                >
                  Filtered
                </Badge>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4"
                  />
                </div>
              </div>

              {/* Skill Selector */}
              <div className="flex-1">
                <Select value={skill} onValueChange={handleChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a skill to explore its network" />
                  </SelectTrigger>
                  <SelectContent className="max-h-80">
                    <SelectItem value="All">
                      <div className="flex items-center gap-2 py-2">
                        <Network size={16} className="text-gray-600" />
                        <span className="font-medium">All Skills</span>
                        <Badge variant="outline" className="ml-auto">
                          {stats.totalNodes}
                        </Badge>
                      </div>
                    </SelectItem>
                    {renderSkillOptions(nodes, searchTerm)}
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Button */}
              {isFiltered && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClear}
                  className="flex items-center gap-2"
                >
                  <X size={16} />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Right side - Stats and Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Quick Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <TrendingUp size={14} />
                <span>{stats.totalNodes} skills</span>
              </div>
              <div className="flex items-center gap-1">
                <Keyboard size={14} />
                <span>Avg: {stats.avgVolume}</span>
              </div>
            </div>

            {/* Advanced Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2"
            >
              <ChevronDown 
                size={16} 
                className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
              />
              Advanced
            </Button>
          </div>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Top Skill
                </label>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {stats.topSkill?.id}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stats.topSkill?.volume} occurrences
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category Distribution
                </label>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {Object.keys(categoryColors).length} categories
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Network Density
                </label>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    High connectivity
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter Status */}
      {isFiltered && (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
            <Network size={16} />
            <span>
              Showing network for <strong>{skill}</strong> and its connected skills
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
 