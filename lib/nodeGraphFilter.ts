type Node = { id: string; volume: number };
type Link = { source: string; target: string; value: number };

type NetworkGraphData = {
  nodes: Node[];
  links: Link[];
};

function getId(node: string | Node): string {
  return typeof node === "string" ? node : node.id;
}

export function nodeGraphFilter(
  inputSkill: string,
  networkGraphDataInput: NetworkGraphData
): NetworkGraphData {
  console.log("Started nodeGraphFilter");
  console.log("inputSkill:" + inputSkill);

  const networkGraphDataOutput: NetworkGraphData = { nodes: [], links: [] };
  const skillSet = new Set<string>();
  const seenLinks = new Set<string>();
  const seenNodes = new Set<string>();

  console.log("Looking at links");
  networkGraphDataInput.links.forEach((link) => {
    const sourceId = getId(link.source);
    const targetId = getId(link.target);

    console.log("Looking at link | s:", sourceId, "| t:", targetId);

    if (sourceId === inputSkill || targetId === inputSkill) {
      console.log("Found relevant link!");
      const key = `${sourceId}-${targetId}`;

      if (!seenLinks.has(key)) {
        // push link with normalized source/target
        networkGraphDataOutput.links.push({
          ...link,
          source: sourceId,
          target: targetId,
        });
        seenLinks.add(key);
      }

      skillSet.add(sourceId);
      skillSet.add(targetId);
    }
  });

  console.log("Finished Links - - - - - - - -");

  console.log("Starting to add nodes - - - - - - - - -");
  networkGraphDataInput.nodes.forEach((node) => {
    console.log("Looking@Node: " + node.id);
    if (skillSet.has(node.id) && !seenNodes.has(node.id)) {
      console.log("Adding Node: " + node.id);
      networkGraphDataOutput.nodes.push(node);
      seenNodes.add(node.id);
    }
  });

  console.log("networkGraphDataOutput");
  console.log(networkGraphDataOutput);

  return networkGraphDataOutput;
}
