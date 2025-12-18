import { useState } from "react";
import "./knapsack.css";

export default function KnapsackVisualizer() {
  const weights = [2, 3, 4, 5];
  const values = [3, 4, 5, 6];
  const capacity = 5;

  const [dp, setDp] = useState([]);

  const computeKnapsack = () => {
    const n = weights.length;
    const table = Array(n + 1)
      .fill(0)
      .map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= capacity; w++) {
        if (weights[i - 1] <= w) {
          table[i][w] = Math.max(
            table[i - 1][w],
            values[i - 1] + table[i - 1][w - weights[i - 1]]
          );
        } else {
          table[i][w] = table[i - 1][w];
        }
      }
    }
    setDp(table);
  };

  return (
    <div className="container">
      <h2>0/1 Knapsack Visualizer</h2>
      <button onClick={computeKnapsack}>Compute</button>

      <div className="grid">
        {dp.map((row, i) =>
          row.map((cell, j) => (
            <div key={`${i}-${j}`} className="cell">
              {cell}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
