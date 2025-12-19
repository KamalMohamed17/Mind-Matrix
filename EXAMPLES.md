# Algorithm Visualizer - Example Inputs

Use these examples to test each algorithm in the visualizer.

## 1. Longest Common Subsequence (LCS)

### Example 1 (Default):
- **String 1:** `ABCDGH`
- **String 2:** `AEDFHR`
- **Expected LCS:** `ADH` (length: 3)

### Example 2:
- **String 1:** `AGGTAB`
- **String 2:** `GXTXAYB`
- **Expected LCS:** `GTAB` (length: 4)

### Example 3:
- **String 1:** `ABCDEF`
- **String 2:** `ACDFEG`
- **Expected LCS:** `ACDF` (length: 4)

---

## 2. 0/1 Knapsack

### Example 1 (Default):
- **Capacity:** `7`
- **Items:**
  ```
  1,10
  3,40
  4,50
  5,70
  ```
- **Result:** Maximum value = 90 (items 2 and 3 selected)

### Example 2:
- **Capacity:** `10`
- **Items:**
  ```
  2,10
  3,15
  5,25
  7,40
  ```
- **Result:** Maximum value = 55 (items 1, 2, and 3)

### Example 3:
- **Capacity:** `15`
- **Items:**
  ```
  5,60
  3,50
  4,70
  2,30
  ```
- **Result:** Maximum value = 120 (items 2 and 3)

---

## 3. Breadth-First Search (BFS)

### Example 1:
- **Rows:** `5`
- **Columns:** `5`
- **Start Node:** `0`
- **Result:** Traverses all 25 nodes starting from node 0

### Example 2:
- **Rows:** `4`
- **Columns:** `4`
- **Start Node:** `5`
- **Result:** Traverses all 16 nodes starting from node 5

### Example 3:
- **Rows:** `3`
- **Columns:** `3`
- **Start Node:** `4`
- **Result:** Traverses all 9 nodes starting from center node 4

---

## 4. A* Pathfinding

### Example 1 (Default):
- **Rows:** `10`
- **Columns:** `10`
- **Start:** `(0, 0)`
- **Goal:** `(9, 9)`
- **Obstacles:** Click cells to add obstacles after starting
- **Result:** Finds shortest path from top-left to bottom-right

### Example 2:
- **Rows:** `8`
- **Columns:** `8`
- **Start:** `(0, 0)`
- **Goal:** `(7, 7)`
- **Result:** Straight diagonal path

### Example 3:
- **Rows:** `12`
- **Columns:** `12`
- **Start:** `(2, 2)`
- **Goal:** `(10, 10)`
- **Result:** Path finding with obstacles

---

## Quick Test Sequence

1. **LCS:** Try "ABCDGH" vs "AEDFHR"
2. **Knapsack:** Try capacity 7 with items: (1,10), (3,40), (4,50), (5,70)
3. **BFS:** Try 5x5 grid starting from node 0
4. **A*:** Try 10x10 grid from (0,0) to (9,9), then click some cells to add obstacles

