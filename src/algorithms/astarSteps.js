export function astarSteps(start = "S", goal = "G") {
  const nodes = [
    { id: "S", x: 60, y: 100 },
    { id: "A", x: 180, y: 60 },
    { id: "B", x: 180, y: 140 },
    { id: "G", x: 320, y: 100 }
  ];

  const edges = [
    ["S", "A"],
    ["S", "B"],
    ["A", "G"],
    ["B", "G"]
  ];

  return [
    {
      description: `Start A* at ${start}`,
      highlights: { nodes: [start] },
      data: { nodes, edges }
    },
    {
      description: "Expand lowest cost node",
      highlights: { nodes: ["A"] },
      data: { nodes, edges }
    },
    {
      description: `Goal ${goal} reached`,
      highlights: { nodes: [goal] },
      data: { nodes, edges }
    }
  ];
}
