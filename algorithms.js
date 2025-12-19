/**
 * Algorithm Implementations
 * Contains step-by-step implementations of all algorithms for visualization
 */

// LCS Algorithm
class LCSAlgorithm {
    constructor(str1, str2) {
        this.str1 = str1;
        this.str2 = str2;
        this.m = str1.length;
        this.n = str2.length;
        this.dp = Array(this.m + 1).fill(null).map(() => Array(this.n + 1).fill(0));
        this.steps = [];
        this.currentStep = 0;
        this.lcs = '';
    }

    // Generate all steps for visualization
    generateSteps() {
        this.steps = [];
        this.currentStep = 0;

        // Step 0: Initialize
        this.steps.push({
            type: 'init',
            message: `Initializing DP table for LCS of "${this.str1}" and "${this.str2}"`,
            i: -1,
            j: -1
        });

        // Fill DP table
        for (let i = 1; i <= this.m; i++) {
            for (let j = 1; j <= this.n; j++) {
                if (this.str1[i - 1] === this.str2[j - 1]) {
                    this.dp[i][j] = this.dp[i - 1][j - 1] + 1;
                    this.steps.push({
                        type: 'match',
                        i: i,
                        j: j,
                        value: this.dp[i][j],
                        message: `Cell (${i},${j}): Characters match! "${this.str1[i-1]}" === "${this.str2[j-1]}" → dp[${i}][${j}] = ${this.dp[i][j]}`
                    });
                } else {
                    this.dp[i][j] = Math.max(this.dp[i - 1][j], this.dp[i][j - 1]);
                    this.steps.push({
                        type: 'no_match',
                        i: i,
                        j: j,
                        value: this.dp[i][j],
                        message: `Cell (${i},${j}): No match → dp[${i}][${j}] = max(dp[${i-1}][${j}], dp[${i}][${j-1}]) = ${this.dp[i][j]}`
                    });
                }
            }
        }

        // Backtrack to find LCS
        this.lcs = this.backtrack();
        const path = this.getBacktrackPath();

        // Add backtrack steps
        this.steps.push({
            type: 'backtrack_start',
            message: `DP table complete! LCS length = ${this.dp[this.m][this.n]}. Starting backtracking...`,
            path: path
        });

        return this.steps;
    }

    backtrack() {
        let i = this.m;
        let j = this.n;
        let result = '';

        while (i > 0 && j > 0) {
            if (this.str1[i - 1] === this.str2[j - 1]) {
                result = this.str1[i - 1] + result;
                i--;
                j--;
            } else if (this.dp[i - 1][j] > this.dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }

        return result;
    }

    getBacktrackPath() {
        const path = [];
        let i = this.m;
        let j = this.n;

        while (i > 0 && j > 0) {
            if (this.str1[i - 1] === this.str2[j - 1]) {
                path.push({ i, j });
                i--;
                j--;
            } else if (this.dp[i - 1][j] > this.dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }

        return path.reverse();
    }

    getStep(index) {
        return this.steps[index] || null;
    }

    getResult() {
        return {
            lcs: this.lcs,
            length: this.dp[this.m][this.n],
            dp: this.dp
        };
    }
}

// 0/1 Knapsack Algorithm
class KnapsackAlgorithm {
    constructor(items, capacity) {
        this.items = items; // Array of {weight, value}
        this.capacity = capacity;
        this.n = items.length;
        this.dp = Array(this.n + 1).fill(null).map(() => Array(this.capacity + 1).fill(0));
        this.steps = [];
        this.currentStep = 0;
        this.selectedItems = [];
    }

    generateSteps() {
        this.steps = [];
        this.currentStep = 0;

        this.steps.push({
            type: 'init',
            message: `Initializing DP table for Knapsack with ${this.n} items and capacity ${this.capacity}`
        });

        for (let i = 1; i <= this.n; i++) {
            for (let w = 1; w <= this.capacity; w++) {
                const item = this.items[i - 1];
                const include = w >= item.weight ? item.value + this.dp[i - 1][w - item.weight] : 0;
                const exclude = this.dp[i - 1][w];

                if (w >= item.weight && include > exclude) {
                    this.dp[i][w] = include;
                    this.steps.push({
                        type: 'include',
                        i: i,
                        w: w,
                        value: this.dp[i][w],
                        item: item,
                        message: `Cell (${i},${w}): Include item ${i} (w=${item.weight}, v=${item.value}) → Value = ${include}`
                    });
                } else {
                    this.dp[i][w] = exclude;
                    this.steps.push({
                        type: 'exclude',
                        i: i,
                        w: w,
                        value: this.dp[i][w],
                        item: item,
                        message: `Cell (${i},${w}): Exclude item ${i} → Value = ${exclude}`
                    });
                }
            }
        }

        // Backtrack to find selected items
        this.selectedItems = this.backtrack();
        this.steps.push({
            type: 'complete',
            message: `Maximum value: ${this.dp[this.n][this.capacity]}. Selected items: [${this.selectedItems.join(', ')}]`,
            selectedItems: this.selectedItems
        });

        return this.steps;
    }

    backtrack() {
        const selected = [];
        let i = this.n;
        let w = this.capacity;

        while (i > 0 && w > 0) {
            if (this.dp[i][w] !== this.dp[i - 1][w]) {
                selected.push(i);
                w -= this.items[i - 1].weight;
            }
            i--;
        }

        return selected.reverse();
    }

    getStep(index) {
        return this.steps[index] || null;
    }

    getResult() {
        return {
            maxValue: this.dp[this.n][this.capacity],
            selectedItems: this.selectedItems,
            dp: this.dp
        };
    }
}

// BFS Algorithm
class BFSAlgorithm {
    constructor(rows, cols, startNode) {
        this.rows = rows;
        this.cols = cols;
        this.startNode = startNode;
        this.graph = this.createGraph(rows, cols);
        this.visited = new Set();
        this.queue = [];
        this.steps = [];
        this.currentStep = 0;
        this.order = [];
    }

    createGraph(rows, cols) {
        const graph = {};
        const totalNodes = rows * cols;

        for (let i = 0; i < totalNodes; i++) {
            graph[i] = [];
            const row = Math.floor(i / cols);
            const col = i % cols;

            // Add neighbors (up, down, left, right)
            if (row > 0) graph[i].push(i - cols); // up
            if (row < rows - 1) graph[i].push(i + cols); // down
            if (col > 0) graph[i].push(i - 1); // left
            if (col < cols - 1) graph[i].push(i + 1); // right
        }

        return graph;
    }

    generateSteps() {
        this.steps = [];
        this.currentStep = 0;
        this.visited.clear();
        this.queue = [this.startNode];
        this.order = [];

        this.steps.push({
            type: 'init',
            message: `Starting BFS from node ${this.startNode}`,
            current: this.startNode,
            queue: [...this.queue],
            visited: new Set()
        });

        while (this.queue.length > 0) {
            const current = this.queue.shift();
            
            if (this.visited.has(current)) {
                continue;
            }

            this.visited.add(current);
            this.order.push(current);

            this.steps.push({
                type: 'visit',
                current: current,
                queue: [...this.queue],
                visited: new Set(this.visited),
                message: `Visiting node ${current}. Queue: [${this.queue.join(', ')}]`
            });

            const neighbors = this.graph[current];
            for (const neighbor of neighbors) {
                if (!this.visited.has(neighbor) && !this.queue.includes(neighbor)) {
                    this.queue.push(neighbor);
                    this.steps.push({
                        type: 'enqueue',
                        current: current,
                        neighbor: neighbor,
                        queue: [...this.queue],
                        visited: new Set(this.visited),
                        message: `Node ${current}: Adding neighbor ${neighbor} to queue. Queue: [${this.queue.join(', ')}]`
                    });
                }
            }
        }

        this.steps.push({
            type: 'complete',
            message: `BFS complete! Visited ${this.visited.size} nodes in order: [${this.order.join(', ')}]`,
            order: [...this.order]
        });

        return this.steps;
    }

    getStep(index) {
        return this.steps[index] || null;
    }

    getResult() {
        return {
            order: this.order,
            visited: Array.from(this.visited)
        };
    }
}

// A* Algorithm
class AStarAlgorithm {
    constructor(rows, cols, start, goal, obstacles = []) {
        this.rows = rows;
        this.cols = cols;
        this.start = start;
        this.goal = goal;
        this.obstacles = new Set(obstacles.map(o => `${o.row},${o.col}`));
        this.openSet = [{ row: start.row, col: start.col, f: 0, g: 0, h: 0 }];
        this.closedSet = new Set();
        this.cameFrom = {};
        this.gScore = { [`${start.row},${start.col}`]: 0 };
        this.steps = [];
        this.currentStep = 0;
        this.path = [];
    }

    heuristic(row1, col1, row2, col2) {
        // Manhattan distance
        return Math.abs(row1 - row2) + Math.abs(col1 - col2);
    }

    getNeighbors(row, col) {
        const neighbors = [];
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (newRow >= 0 && newRow < this.rows && 
                newCol >= 0 && newCol < this.cols &&
                !this.obstacles.has(`${newRow},${newCol}`)) {
                neighbors.push({ row: newRow, col: newCol });
            }
        }

        return neighbors;
    }

    generateSteps() {
        this.steps = [];
        this.currentStep = 0;
        this.openSet = [{ row: this.start.row, col: this.start.col, f: 0, g: 0, h: 0 }];
        this.closedSet.clear();
        this.cameFrom = {};
        this.gScore = { [`${this.start.row},${this.start.col}`]: 0 };

        this.steps.push({
            type: 'init',
            message: `Starting A* from (${this.start.row},${this.start.col}) to (${this.goal.row},${this.goal.col})`,
            current: null,
            openSet: [...this.openSet],
            closedSet: []
        });

        while (this.openSet.length > 0) {
            // Find node with lowest f-score
            let currentIdx = 0;
            for (let i = 1; i < this.openSet.length; i++) {
                if (this.openSet[i].f < this.openSet[currentIdx].f) {
                    currentIdx = i;
                }
            }

            const current = this.openSet[currentIdx];
            const currentKey = `${current.row},${current.col}`;

            // Remove current from openSet
            this.openSet.splice(currentIdx, 1);
            this.closedSet.add(currentKey);

            this.steps.push({
                type: 'select',
                current: { row: current.row, col: current.col, f: current.f, g: current.g, h: current.h },
                openSet: [...this.openSet],
                closedSet: Array.from(this.closedSet),
                message: `Selecting node (${current.row},${current.col}) with f=${current.f} (g=${current.g}, h=${current.h})`
            });

            // Check if goal reached
            if (current.row === this.goal.row && current.col === this.goal.col) {
                // Reconstruct path
                this.path = this.reconstructPath(current);
                this.steps.push({
                    type: 'goal_reached',
                    path: [...this.path],
                    message: `Goal reached! Path length: ${this.path.length - 1}`,
                    openSet: [...this.openSet],
                    closedSet: Array.from(this.closedSet)
                });
                return this.steps;
            }

            // Explore neighbors
            const neighbors = this.getNeighbors(current.row, current.col);
            for (const neighbor of neighbors) {
                const neighborKey = `${neighbor.row},${neighbor.col}`;

                if (this.closedSet.has(neighborKey)) {
                    continue;
                }

                const tentativeG = current.g + 1;
                const h = this.heuristic(neighbor.row, neighbor.col, this.goal.row, this.goal.col);
                const f = tentativeG + h;

                if (!this.gScore[neighborKey] || tentativeG < this.gScore[neighborKey]) {
                    this.cameFrom[neighborKey] = currentKey;
                    this.gScore[neighborKey] = tentativeG;

                    // Check if neighbor is in openSet
                    const inOpenSet = this.openSet.find(n => n.row === neighbor.row && n.col === neighbor.col);
                    if (!inOpenSet) {
                        this.openSet.push({ row: neighbor.row, col: neighbor.col, f, g: tentativeG, h });
                        this.steps.push({
                            type: 'explore',
                            current: { row: current.row, col: current.col },
                            neighbor: { row: neighbor.row, col: neighbor.col, f, g: tentativeG, h },
                            openSet: [...this.openSet],
                            closedSet: Array.from(this.closedSet),
                            message: `Exploring (${neighbor.row},${neighbor.col}): f=${f} (g=${tentativeG}, h=${h})`
                        });
                    } else {
                        // Update if better path found
                        inOpenSet.f = f;
                        inOpenSet.g = tentativeG;
                        inOpenSet.h = h;
                    }
                }
            }
        }

        this.steps.push({
            type: 'no_path',
            message: 'No path found to goal!',
            openSet: [...this.openSet],
            closedSet: Array.from(this.closedSet)
        });

        return this.steps;
    }

    reconstructPath(current) {
        const path = [];
        let currentKey = `${current.row},${current.col}`;

        while (currentKey) {
            const [row, col] = currentKey.split(',').map(Number);
            path.unshift({ row, col });
            currentKey = this.cameFrom[currentKey];
        }

        return path;
    }

    getStep(index) {
        return this.steps[index] || null;
    }

    getResult() {
        return {
            path: this.path,
            pathLength: this.path.length > 0 ? this.path.length - 1 : -1
        };
    }
}

