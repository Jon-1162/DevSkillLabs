/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Info, 
  Network,
  Filter,
  Search,
  X,
  ChevronDown,
  Layout,
  Settings
} from "lucide-react";
import { nodeGraphFilter } from "@/lib/nodeGraphFilter";

// Import Cytoscape dynamically
let cytoscape: any = null;

type NetworkGraphData = {
  nodes: { id: string; volume: number; group?: number; category?: string }[];
  links: { source: string; target: string; value: number; strength?: number }[];
};

interface CytoscapeNodeGraphProps {
  nodes: { id: string; volume: number }[];
  links: { source: string; target: string; value: number }[];
  title?: string;
}

// Modern color palette for different skill categories
const skillColors = {
  'Programming Languages': '#3b82f6', // Blue
  'Frameworks': '#8b5cf6', // Purple
  'Databases': '#06b6d4', // Cyan
  'Cloud/DevOps': '#10b981', // Emerald
  'Tools': '#f59e0b', // Amber
  'Other': '#ef4444', // Red
  'default': '#6b7280' // Gray
};

// Categorize skills based on common patterns
const categorizeSkill = (skillName: string): string => {
  const name = skillName.toLowerCase();
  
  if (['javascript', 'python', 'java', 'typescript', 'go', 'rust', 'c++', 'c#', 'php', 'ruby', 'swift', 'kotlin'].includes(name)) {
    return 'Programming Languages';
  }
  if (['react', 'vue', 'angular', 'node.js', 'express', 'django', 'flask', 'spring', 'laravel', 'rails'].includes(name)) {
    return 'Frameworks';
  }
  if (['mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'sql', 'oracle', 'sqlite'].includes(name)) {
    return 'Databases';
  }
  if (['aws', 'docker', 'kubernetes', 'azure', 'gcp', 'terraform', 'jenkins', 'ci/cd'].includes(name)) {
    return 'Cloud/DevOps';
  }
  if (['git', 'github', 'gitlab', 'jira', 'confluence', 'figma', 'postman', 'vscode'].includes(name)) {
    return 'Tools';
  }
  
  return 'Other';
};

// Layout options
const layoutOptions = {
  'cose': {
    name: 'cose',
    idealEdgeLength: 100,
    nodeOverlap: 20,
    refresh: 20,
    fit: true,
    padding: 30,
    randomize: false,
    componentSpacing: 100,
    nodeRepulsion: 400000,
    edgeElasticity: 100,
    nestingFactor: 5,
    gravity: 80,
    numIter: 1000,
    initialTemp: 200,
    coolingFactor: 0.95,
    minTemp: 1.0
  },
  'force': {
    name: 'preset',
    fit: true,
    padding: 30
  },
  'circle': {
    name: 'circle',
    fit: true,
    padding: 30,
    radius: 200
  },
  'grid': {
    name: 'grid',
    fit: true,
    padding: 30,
    rows: 4
  },
  'concentric': {
    name: 'concentric',
    fit: true,
    padding: 30,
    startAngle: 3/2 * Math.PI,
    sweep: undefined,
    clockwise: true,
    equidistant: false,
    minNodeSpacing: 20,
    boundingBox: undefined,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: false,
    levelWidth: (nodes: any) => nodes.maxDegree() / 4,
    concentric: function(node: any) { return node.degree(); },
    levelHeight: function(node: any) { return 1; }
  }
};

function CytoscapeNodeGraph({ nodes, links, title = "Skill Relationship Network" }: CytoscapeNodeGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<any>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCytoscapeLoaded, setIsCytoscapeLoaded] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [currentLayout, setCurrentLayout] = useState<string>('cose');
  const [searchTerm, setSearchTerm] = useState("");
  const [graphStats, setGraphStats] = useState({ totalNodes: 0, totalLinks: 0, avgConnections: 0 });

  // Enhanced graph data with categories and better structure
  const enhancedGraphData = useMemo(() => {
    const enhancedNodes = nodes.map(node => ({
      ...node,
      volume: node.volume || 0,
      category: categorizeSkill(node.id || ''),
      group: Math.floor(Math.log10((node.volume || 0) + 1))
    }));

    const enhancedLinks = links.map(link => ({
      ...link,
      value: link.value || 0,
      strength: Math.min((link.value || 0) / 10, 1)
    }));

    return { nodes: enhancedNodes, links: enhancedLinks };
  }, [nodes, links]);

  const [graphData, setGraphData] = useState<NetworkGraphData>(enhancedGraphData);

  // Calculate graph statistics
  useEffect(() => {
    const totalNodes = graphData.nodes.length;
    const totalLinks = graphData.links.length;
    const avgConnections = totalNodes > 0 ? (totalLinks * 2) / totalNodes : 0;
    
    setGraphStats({ totalNodes, totalLinks, avgConnections: Math.round(avgConnections * 10) / 10 });
  }, [graphData]);

  // Initialize Cytoscape
  useEffect(() => {
    let isMounted = true;
    
    const initializeCytoscape = async () => {
      if (!containerRef.current || graphData.nodes.length === 0 || !isMounted) return;

      try {
        // Dynamically import Cytoscape
        if (!cytoscape) {
          const cytoscapeModule = await import('cytoscape');
          cytoscape = cytoscapeModule.default;
          if (isMounted) {
            setIsCytoscapeLoaded(true);
          }
        }

        // Destroy existing instance with comprehensive cleanup
        if (cyRef.current) {
          try {
            // Stop any running layouts first
            if (cyRef.current.layout) {
              try {
                cyRef.current.layout.stop();
              } catch (layoutError) {
                console.warn('Error stopping layout:', layoutError);
              }
            }
            
            // Remove all event listeners
            try {
              cyRef.current.removeAllListeners();
            } catch (listenerError) {
              console.warn('Error removing listeners:', listenerError);
            }
            
            // Clear all elements
            try {
              cyRef.current.elements().remove();
            } catch (elementError) {
              console.warn('Error removing elements:', elementError);
            }
            
            // Destroy the instance
            cyRef.current.destroy();
          } catch (error) {
            console.warn('Error destroying Cytoscape instance:', error);
          }
          cyRef.current = null;
        }

        // Create a safer Cytoscape instance with comprehensive error handling
        const cy = cytoscape({
          container: containerRef.current,
          elements: {
            nodes: graphData.nodes.map(node => ({
              data: {
                id: node.id,
                label: node.id,
                volume: node.volume || 0,
                category: node.category || 'Other',
                group: node.group || 0
              }
            })),
            edges: graphData.links.map(link => ({
              data: {
                id: `${link.source}-${link.target}`,
                source: link.source,
                target: link.target,
                weight: link.value || 0,
                strength: link.strength || 0
              }
            }))
          },
          // Add comprehensive configuration to prevent errors
          headless: false,
          styleEnabled: true,
          hideEdgesOnViewport: false,
          hideLabelsOnViewport: false,
          textureOnViewport: false,
          motionBlur: false,
          motionBlurOpacity: 0.2,
          wheelSensitivity: 1,
          pixelRatio: 'auto',
          // Add error handling
          style: [
            {
              selector: 'node',
              style: {
                'background-color': (node: any) => {
                  const category = node.data('category') || 'Other';
                  return skillColors[category as keyof typeof skillColors] || skillColors.default;
                },
                'label': 'data(label)',
                'text-valign': 'center',
                'text-halign': 'center',
                'color': '#ffffff',
                'font-size': '12px',
                'font-weight': 'bold',
                'text-outline-width': 2,
                'text-outline-color': '#000000',
                'width': (node: any) => Math.max(20, Math.min(60, 20 + (node.data('volume') || 0) * 0.8)),
                'height': (node: any) => Math.max(20, Math.min(60, 20 + (node.data('volume') || 0) * 0.8)),
                'border-width': 2,
                'border-color': '#ffffff',
                'border-opacity': 0.8,
                'shape': 'round-rectangle',
                'overlay-opacity': 0,
                'shadow-blur': (node: any) => (node.data('volume') || 0) > 20 ? 10 : 5,
                'shadow-color': (node: any) => {
                  const category = node.data('category') || 'Other';
                  return skillColors[category as keyof typeof skillColors] || skillColors.default;
                },
                'shadow-opacity': 0.3
              }
            },
            {
              selector: 'edge',
              style: {
                'width': (edge: any) => Math.max(1, Math.min(8, Math.sqrt(edge.data('weight') || 1) * 0.5)),
                'line-color': (edge: any) => {
                  const weight = edge.data('weight') || 0;
                  if (weight > 15) return '#3b82f6';
                  if (weight > 8) return '#8b5cf6';
                  return '#6b7280';
                },
                'opacity': (edge: any) => {
                  const strength = edge.data('strength');
                  const safeStrength = Number.isFinite(strength) ? strength : 0;
                  return Math.min(0.8, Math.max(0.3, 0.4 + (safeStrength * 0.4)));
                },
                'curve-style': 'bezier',
                'target-arrow-shape': 'none',
                'target-arrow-color': (edge: any) => {
                  const weight = edge.data('weight') || 0;
                  if (weight > 15) return '#3b82f6';
                  if (weight > 8) return '#8b5cf6';
                  return '#6b7280';
                },
                'target-arrow-size': (edge: any) => Math.max(2, Math.min(6, Math.sqrt(edge.data('weight') || 1) * 0.3)),
                'line-cap': 'round'
              }
            },
            {
              selector: 'node:selected',
              style: {
                'border-width': 4,
                'border-color': '#f59e0b',
                'shadow-blur': 15,
                'shadow-opacity': 0.6
              }
            },
            {
              selector: 'node:hover',
              style: {
                'border-width': 3,
                'border-color': '#ffffff',
                'shadow-blur': 12,
                'shadow-opacity': 0.5
              }
            }
          ],
          layout: layoutOptions[currentLayout as keyof typeof layoutOptions],
          userZoomingEnabled: true,
          userPanningEnabled: true,
          boxSelectionEnabled: false,
          selectionType: 'single',
          ready: function() {
            // Ensure the instance is ready before setting ref
            if (cy && !cy.destroyed) {
              cyRef.current = cy;
            }
          }
        });

        // Set ref immediately but with validation
        if (cy && !cy.destroyed && isMounted) {
          cyRef.current = cy;
          
          // Add comprehensive error handling
          try {
            // Add global error handler
            cy.on('error', (event: any) => {
              console.warn('Cytoscape error caught:', event);
            });
            
            // Override the layout system to prevent notify errors
            const originalLayout = cy.layout.bind(cy);
            cy.layout = function(config: any) {
              if (cy.destroyed || !isMounted) {
                console.warn('Layout called on destroyed instance, ignoring');
                return { run: () => {}, stop: () => {} };
              }
              return originalLayout(config);
            };
            
          } catch (error) {
            console.warn('Error adding error handling:', error);
          }
        }

        // Event listeners with error handling - only add if instance is valid
        if (cy && !cy.destroyed && isMounted) {
          // Add a small delay to ensure Cytoscape is fully initialized
          setTimeout(() => {
            if (cy && !cy.destroyed && isMounted) {
              cy.on('mouseover', 'node', (event: any) => {
                try {
                  if (!cy || cy.destroyed || !isMounted) return;
                  const node = event.target;
                  if (node && node.data && cy && !cy.destroyed) {
                    setHoveredNode({
                      id: node.data('id'),
                      volume: node.data('volume'),
                      category: node.data('category')
                    });
                  }
                } catch (error) {
                  console.warn('Error in mouseover handler:', error);
                }
              });

              cy.on('mouseout', 'node', () => {
                try {
                  if (!cy || cy.destroyed || !isMounted) return;
                  setHoveredNode(null);
                } catch (error) {
                  console.warn('Error in mouseout handler:', error);
                }
              });

              cy.on('tap', 'node', (event: any) => {
                try {
                  if (!cy || cy.destroyed || !isMounted) return;
                  const node = event.target;
                  if (node && cy && !cy.destroyed) {
                    cy.animate({
                      center: { eles: node },
                      zoom: 2
                    }, {
                      duration: 1000
                    });
                  }
                } catch (error) {
                  console.warn('Error in tap handler:', error);
                }
              });
            }
          }, 100);
        }

      } catch (error) {
        console.error('Error initializing Cytoscape:', error);
      }
    };

    initializeCytoscape();

    return () => {
      isMounted = false;
      if (cyRef.current) {
        try {
          // Stop any running layouts first
          if (cyRef.current.layout) {
            try {
              cyRef.current.layout.stop();
            } catch (layoutError) {
              console.warn('Error stopping layout in cleanup:', layoutError);
            }
          }
          
          // Remove all event listeners
          try {
            cyRef.current.removeAllListeners();
          } catch (listenerError) {
            console.warn('Error removing listeners in cleanup:', listenerError);
          }
          
          // Clear all elements
          try {
            cyRef.current.elements().remove();
          } catch (elementError) {
            console.warn('Error removing elements in cleanup:', elementError);
          }
          
          // Destroy the instance
          cyRef.current.destroy();
        } catch (error) {
          console.warn('Error destroying Cytoscape instance in cleanup:', error);
        }
        cyRef.current = null;
      }
    };
  }, [graphData, currentLayout]);

  // Filter handling
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      try {
        if (!selectedSkill || selectedSkill === "All") {
          setGraphData(enhancedGraphData);
        } else {
          const filtered = nodeGraphFilter(selectedSkill, enhancedGraphData);
          setGraphData(filtered);
        }
      } catch (error) {
        console.warn('Error filtering graph data:', error);
        setGraphData(enhancedGraphData);
      } finally {
        setIsLoading(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedSkill, enhancedGraphData]);

  // Control functions
  const handleZoomIn = useCallback(() => {
    if (cyRef.current && !cyRef.current.destroyed && cyRef.current.isHeadless !== undefined) {
      try {
        const currentZoom = cyRef.current.zoom();
        if (typeof currentZoom === 'number' && !isNaN(currentZoom)) {
          cyRef.current.zoom(currentZoom * 1.2);
        }
      } catch (error) {
        console.warn('Error zooming in:', error);
      }
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (cyRef.current && !cyRef.current.destroyed && cyRef.current.isHeadless !== undefined) {
      try {
        const currentZoom = cyRef.current.zoom();
        if (typeof currentZoom === 'number' && !isNaN(currentZoom)) {
          cyRef.current.zoom(currentZoom * 0.8);
        }
      } catch (error) {
        console.warn('Error zooming out:', error);
      }
    }
  }, []);

  const handleReset = useCallback(() => {
    if (cyRef.current && !cyRef.current.destroyed && cyRef.current.isHeadless !== undefined) {
      try {
        cyRef.current.fit();
      } catch (error) {
        console.warn('Error resetting view:', error);
      }
    }
  }, []);

  const handleLayoutChange = useCallback((layout: string) => {
    setCurrentLayout(layout);
    if (cyRef.current && !cyRef.current.destroyed && cyRef.current.isHeadless !== undefined) {
      try {
        // Stop any existing layout first with comprehensive cleanup
        if (cyRef.current.layout) {
          try {
            cyRef.current.layout.stop();
          } catch (error) {
            console.warn('Error stopping layout:', error);
          }
        }
        
        // Add a small delay to ensure layout is fully stopped
        setTimeout(() => {
          if (cyRef.current && !cyRef.current.destroyed && cyRef.current.isHeadless !== undefined) {
            try {
              const layoutConfig = layoutOptions[layout as keyof typeof layoutOptions];
              const layoutInstance = cyRef.current.layout(layoutConfig);
              if (layoutInstance && !cyRef.current.destroyed && cyRef.current.isHeadless !== undefined) {
                layoutInstance.run();
              }
            } catch (error) {
              console.warn('Error running layout:', error);
            }
          }
        }, 50);
      } catch (error) {
        console.warn('Error changing layout:', error);
      }
    }
  }, []);

  const filteredNodes = useMemo(() => {
    return enhancedGraphData.nodes.filter(node => 
      node.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [enhancedGraphData.nodes, searchTerm]);

  return (
    <Card className="lg:max-w-4xl w-full mx-auto border-0 p-0 lg:p-5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <CardHeader className="pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Interactive network with advanced clustering • {graphStats.totalNodes} skills • {graphStats.totalLinks} connections • Avg {graphStats.avgConnections} connections per skill
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInstructions(!showInstructions)}
              className="flex items-center gap-2"
            >
              <Info size={16} />
              Instructions
            </Button>
          </div>
        </div>

        {/* Instructions Panel */}
        {showInstructions && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Navigation</h4>
                <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                  <li>• <strong>Scroll:</strong> Zoom in/out</li>
                  <li>• <strong>Drag:</strong> Pan around the graph</li>
                  <li>• <strong>Click node:</strong> Focus on that skill</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Layouts</h4>
                <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                  <li>• <strong>COSE:</strong> Force-directed with clustering</li>
                  <li>• <strong>Circle:</strong> Circular arrangement</li>
                  <li>• <strong>Grid:</strong> Regular grid layout</li>
                  <li>• <strong>Concentric:</strong> Hierarchical circles</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Visual Elements</h4>
                <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                  <li>• <strong>Node size:</strong> Skill frequency</li>
                  <li>• <strong>Edge thickness:</strong> Co-occurrence strength</li>
                  <li>• <strong>Colors:</strong> Skill categories</li>
                  <li>• <strong>Shadows:</strong> Importance indicators</li>
                </ul>
              </div>
            </div>
            
            {/* Visual Legend */}
            <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Category Colors</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Object.entries(skillColors).filter(([key]) => key !== 'default').map(([category, color]) => (
                  <div key={category} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs text-blue-800 dark:text-blue-200">{category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="mt-4 flex flex-wrap gap-3">
          {/* Search */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Layout Selector */}
          <div className="flex gap-2">
            <select
              value={currentLayout}
              onChange={(e) => handleLayoutChange(e.target.value)}
              className=" py-2 border border-gray-300 rounded-lg flex justify-center items-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="cose">COSE (Clustered)</option>
              <option value="circle">Circle</option>
              <option value="grid">Grid</option>
              <option value="concentric">Concentric</option>
            </select>
          </div>

          {/* Skill Filter */}
          <div className="flex gap-2">
            <select
              value={selectedSkill || "All"}
              onChange={(e) => setSelectedSkill(e.target.value === "All" ? null : e.target.value)}
              className=" py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Skills</option>
              {filteredNodes.slice(0, 20).map(node => (
                <option key={node.id} value={node.id}>
                  {node.id} ({node.volume})
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="lg:h-[700px] h-fit lg:px-6">
        <div className="relative h-full">
          {/* Loading Overlay */}
          {(isLoading || !isCytoscapeLoaded) && (
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  {!isCytoscapeLoaded ? "Loading visualization engine... \n If it doesn't load refresh the page" : "Loading network..."}
                </span>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
            >
              <ZoomIn size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
            >
              <ZoomOut size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
            >
              <RotateCcw size={16} />
            </Button>
          </div>

          {/* Hover Info */}
          {hoveredNode && (
            <div className="absolute top-4 left-4 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 max-w-xs">
              <h4 className="font-semibold text-gray-900 dark:text-white">{hoveredNode.id}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Frequency: {hoveredNode.volume}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Category: {hoveredNode.category}
              </p>
            </div>
          )}

          {/* Graph Container */}
          <div 
            ref={containerRef}
            className="w-full h-full border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
            style={{ minHeight: '600px' }}
          />
          
          {/* No Data Message */}
          {graphData.nodes.length === 0 && isCytoscapeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <div className="text-lg font-medium mb-2">No data available</div>
                <div className="text-sm">Please check your data source</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default CytoscapeNodeGraph;
