export default function DPInputPanel({
  algorithm,
  lcsInput,
  setLcsInput,
  knapsackInput,
  setKnapsackInput
}) {
  if (algorithm === "LCS") {
    return (
      <div className="input-panel">
        <input
          placeholder="String 1"
          value={lcsInput.s1}
          onChange={(e) =>
            setLcsInput({ ...lcsInput, s1: e.target.value })
          }
        />
        <input
          placeholder="String 2"
          value={lcsInput.s2}
          onChange={(e) =>
            setLcsInput({ ...lcsInput, s2: e.target.value })
          }
        />
      </div>
    );
  }

  if (algorithm === "KNAPSACK") {
    return (
      <div className="input-panel">
        <input
          placeholder="Weights (1,2,3)"
          value={knapsackInput.weights}
          onChange={(e) =>
            setKnapsackInput({ ...knapsackInput, weights: e.target.value })
          }
        />
        <input
          placeholder="Values (6,10,12)"
          value={knapsackInput.values}
          onChange={(e) =>
            setKnapsackInput({ ...knapsackInput, values: e.target.value })
          }
        />
        <input
          placeholder="Capacity"
          value={knapsackInput.capacity}
          onChange={(e) =>
            setKnapsackInput({ ...knapsackInput, capacity: e.target.value })
          }
        />
      </div>
    );
  }

  return null;
}
