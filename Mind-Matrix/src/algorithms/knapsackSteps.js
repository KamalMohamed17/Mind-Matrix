export function knapsackSteps(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));
  const steps = [];

  steps.push({
    description: "Initialize Knapsack DP table",
    highlights: {},
    data: { table: dp.map(r => [...r]) }
  });

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          values[i - 1] + dp[i - 1][w - weights[i - 1]]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }

      steps.push({
        description: `Process item ${i}, capacity ${w}`,
        highlights: { cells: [[i, w]] },
        data: { table: dp.map(r => [...r]) }
      });
    }
  }

  return steps;
}
