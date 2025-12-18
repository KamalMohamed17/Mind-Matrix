export function bfsSteps(start = "A") {
  const nodes = [
    { id: "A", x: 80, y: 80 },
    { id: "B", x: 200, y: 60 },
    { id: "C", x: 200, y: 140 },
    { id: "D", x: 320, y: 100 }
  ];

  const edges = [
    ["A", "B"],
    ["A", "C"],
    ["B", "D"]
  ];

  return [
    {
      description: `Start BFS at ${start}`,
      highlights: { nodes: [start] },
      data: { nodes, edges }
    },
    {
      description: "Visit neighbors",
      highlights: { nodes: ["B", "C"] },
      data: { nodes, edges }
    },
    {
      description: "Visit D",
      highlights: { nodes: ["D"] },
      data: { nodes, edges }
    }
  ];
}
