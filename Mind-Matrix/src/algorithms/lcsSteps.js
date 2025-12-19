export function lcsSteps(s1 = "ABC", s2 = "AC") {
  const m = s1.length;
  const n = s2.length;

  const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  const steps = [];

  steps.push({
    description: "Initialize DP table",
    highlights: {},
    data: { table: dp.map(r => [...r]) }
  });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        steps.push({
          description: `Match '${s1[i - 1]}'`,
          highlights: { cells: [[i, j]] },
          data: { table: dp.map(r => [...r]) }
        });
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        steps.push({
          description: `No match → take max`,
          highlights: { cells: [[i, j]] },
          data: { table: dp.map(r => [...r]) }
        });
      }
    }
  }

  return steps;
}
