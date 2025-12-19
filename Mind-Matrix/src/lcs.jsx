import { useState } from "react";
import "./lcs.css";

export default function LCSVisualizer() {
  const [s1, setS1] = useState("ABCBDAB");
  const [s2, setS2] = useState("BDCAB");
  const [dp, setDp] = useState([]);

  const computeLCS = () => {
    const m = s1.length;
    const n = s2.length;
    const table = Array(m + 1)
      .fill(0)
      .map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (s1[i - 1] === s2[j - 1]) {
          table[i][j] = table[i - 1][j - 1] + 1;
        } else {
          table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
        }
      }
    }
    setDp(table);
  };

  return (
    <div className="container">
      <h2>LCS Visualizer</h2>

      <input value={s1} onChange={(e) => setS1(e.target.value)} />
      <input value={s2} onChange={(e) => setS2(e.target.value)} />

      <button onClick={computeLCS}>Compute</button>

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
