

export type QueryContextType = {
  location: string;
  setLocation: (loc: string) => void;
  category: string;
  setCategory: (cat: string) => void;
  timeFrame: string;
  setTimeFrame: (time: string) => void;
  fanng: string;
  setFanng: (company: string) => void;
  jobData: any;
  setJobData: (jobData: any) => void;
};


export type Node = { 
  id: string; 
  volume: number; 
  category?: string; 
  group?: number;
};

export type Link = { 
  source: string; 
  target: string; 
  value: number; 
  strength?: number;
};

export type NetworkGraphData = {
  nodes: Node[];
  links: Link[];
};

export type SkillCountObj = {
  name: string;
  value: number;
}

export type TreeMapDataChild = {
  name: string;
  size: number;
  color: string;
}

export type TreeMapData = {
  name: string;
  children: TreeMapDataChild[];
}

export type DSSJobData = {
  skillCounts:SkillCountObj[];
  treemapData: TreeMapData[];
  networkGraphData: NetworkGraphData
}