export default function AlgorithmSelector({ setAlgorithm }) {
  return (
    <select onChange={(e) => setAlgorithm(e.target.value)}>
      <option value="LCS">LCS</option>
      <option value="KNAPSACK">Knapsack</option>
      <option value="BFS">BFS</option>
      <option value="ASTAR">A*</option>
    </select>
  );
}
