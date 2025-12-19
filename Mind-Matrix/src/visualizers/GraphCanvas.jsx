export default function GraphCanvas({ step }) {
  const nodes = step.data.nodes;
  const edges = step.data.edges;

  return (
    <svg width="400" height="300">
      {edges.map(([a, b], i) => {
        const na = nodes.find(n => n.id === a);
        const nb = nodes.find(n => n.id === b);
        return (
          <line
            key={i}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            stroke="black"
          />
        );
      })}

      {nodes.map(n => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r="18"
            fill={step.highlights.nodes?.includes(n.id) ? "orange" : "lightblue"}
            stroke="black"
          />
          <text x={n.x - 5} y={n.y + 5}>{n.id}</text>
        </g>
      ))}
    </svg>
  );
}
