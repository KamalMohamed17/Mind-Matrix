import DPTable from "../visualizers/DPTable";
import GraphCanvas from "../visualizers/GraphCanvas";

export default function VisualizationArea({ step, algorithm }) {
  if (!step) return <div className="viz">Load an algorithm</div>;

  const isDP = algorithm === "LCS" || algorithm === "KNAPSACK";

  return (
    <div className="viz">
      {isDP ? <DPTable step={step} /> : <GraphCanvas step={step} />}
    </div>
  );
}
