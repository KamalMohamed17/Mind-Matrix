export default function GraphInputPanel({ algorithm, graphInput, setGraphInput }) {
  if (algorithm !== "BFS" && algorithm !== "ASTAR") return null;

  return (
    <div className="input-panel">
      <input
        placeholder="Start Node"
        value={graphInput.start}
        onChange={(e) =>
          setGraphInput({ ...graphInput, start: e.target.value })
        }
      />
      {algorithm === "ASTAR" && (
        <input
          placeholder="Goal Node"
          value={graphInput.goal}
          onChange={(e) =>
            setGraphInput({ ...graphInput, goal: e.target.value })
          }
        />
      )}
    </div>
  );
}
