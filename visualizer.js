/**
 * Visualization Renderer
 * Handles rendering of all algorithm visualizations
 */

class Visualizer {
    constructor(container) {
        this.container = container;
        this.currentAlgorithm = null;
        this.currentStepIndex = 0;
        this.algorithmInstance = null;
    }

    // Clear visualization area
    clear() {
        this.container.innerHTML = '';
        this.algorithmInstance = null;
        this.currentStepIndex = 0;
    }

    // Set current algorithm
    setAlgorithm(algorithm) {
        this.currentAlgorithm = algorithm;
        this.clear();
    }

    // Render LCS visualization
    renderLCS(algorithmInstance, stepIndex) {
        this.algorithmInstance = algorithmInstance;
        this.currentStepIndex = stepIndex;

        const result = algorithmInstance.getResult();
        const step = algorithmInstance.getStep(stepIndex);

        const container = document.createElement('div');
        container.className = 'lcs-container';

        // Display strings
        const stringsDiv = document.createElement('div');
        stringsDiv.className = 'lcs-strings';

        const str1Div = document.createElement('div');
        str1Div.className = 'lcs-string-display';
        str1Div.textContent = `String 1: ${algorithmInstance.str1}`;

        const str2Div = document.createElement('div');
        str2Div.className = 'lcs-string-display';
        str2Div.textContent = `String 2: ${algorithmInstance.str2}`;

        stringsDiv.appendChild(str1Div);
        stringsDiv.appendChild(str2Div);
        container.appendChild(stringsDiv);

        // DP Table
        const table = document.createElement('table');
        table.className = 'lcs-table';

        // Header row
        const headerRow = document.createElement('tr');
        const emptyCell = document.createElement('td');
        emptyCell.className = 'lcs-cell header';
        headerRow.appendChild(emptyCell);

        for (let j = 0; j <= algorithmInstance.n; j++) {
            const cell = document.createElement('td');
            cell.className = 'lcs-cell header';
            cell.textContent = j === 0 ? '' : algorithmInstance.str2[j - 1];
            headerRow.appendChild(cell);
        }
        table.appendChild(headerRow);

        // Data rows
        for (let i = 0; i <= algorithmInstance.m; i++) {
            const row = document.createElement('tr');

            // Row header
            const rowHeader = document.createElement('td');
            rowHeader.className = 'lcs-cell header';
            rowHeader.textContent = i === 0 ? '' : algorithmInstance.str1[i - 1];
            row.appendChild(rowHeader);

            for (let j = 0; j <= algorithmInstance.n; j++) {
                const cell = document.createElement('td');
                cell.className = 'lcs-cell';
                cell.textContent = result.dp[i][j];

                // Highlight current cell
                if (step && step.i === i && step.j === j && step.type !== 'backtrack_start') {
                    cell.classList.add('current');
                }

                // Highlight backtrack path
                if (step && step.type === 'backtrack_start' && step.path) {
                    const isInPath = step.path.some(p => p.i === i && p.j === j);
                    if (isInPath) {
                        cell.classList.add('path');
                    }
                }

                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        container.appendChild(table);

        // Result display
        if (step && step.type === 'backtrack_start') {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'lcs-result';
            resultDiv.textContent = `LCS: "${result.lcs}" (Length: ${result.length})`;
            container.appendChild(resultDiv);
        }

        this.container.innerHTML = '';
        this.container.appendChild(container);
    }

    // Render Knapsack visualization
    renderKnapsack(algorithmInstance, stepIndex) {
        this.algorithmInstance = algorithmInstance;
        this.currentStepIndex = stepIndex;

        const result = algorithmInstance.getResult();
        const step = algorithmInstance.getStep(stepIndex);

        const container = document.createElement('div');
        container.className = 'knapsack-container';

        // Items display
        const itemsDiv = document.createElement('div');
        itemsDiv.className = 'knapsack-items';

        algorithmInstance.items.forEach((item, idx) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'knapsack-item';
            if (step && step.i === idx + 1 && step.type !== 'complete') {
                itemDiv.classList.add('selected');
            }
            itemDiv.innerHTML = `
                <div><strong>Item ${idx + 1}</strong></div>
                <div>Weight: ${item.weight}</div>
                <div>Value: ${item.value}</div>
            `;
            itemsDiv.appendChild(itemDiv);
        });

        container.appendChild(itemsDiv);

        // DP Table
        const table = document.createElement('table');
        table.className = 'knapsack-table';

        // Header row
        const headerRow = document.createElement('tr');
        const emptyCell = document.createElement('td');
        emptyCell.className = 'knapsack-cell header';
        headerRow.appendChild(emptyCell);

        for (let w = 0; w <= algorithmInstance.capacity; w++) {
            const cell = document.createElement('td');
            cell.className = 'knapsack-cell header';
            cell.textContent = w;
            headerRow.appendChild(cell);
        }
        table.appendChild(headerRow);

        // Data rows
        for (let i = 0; i <= algorithmInstance.n; i++) {
            const row = document.createElement('tr');

            const rowHeader = document.createElement('td');
            rowHeader.className = 'knapsack-cell header';
            rowHeader.textContent = i === 0 ? '0' : `Item ${i}`;
            row.appendChild(rowHeader);

            for (let w = 0; w <= algorithmInstance.capacity; w++) {
                const cell = document.createElement('td');
                cell.className = 'knapsack-cell';
                cell.textContent = result.dp[i][w];

                // Highlight current cell
                if (step && step.i === i && step.w === w && step.type !== 'complete') {
                    cell.classList.add('current');
                    if (step.type === 'include') {
                        cell.classList.add('include');
                    } else if (step.type === 'exclude') {
                        cell.classList.add('exclude');
                    }
                }

                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        container.appendChild(table);

        // Result display
        if (step && step.type === 'complete') {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'lcs-result';
            resultDiv.textContent = `Maximum Value: ${result.maxValue} | Selected Items: [${result.selectedItems.join(', ')}]`;
            container.appendChild(resultDiv);
        }

        this.container.innerHTML = '';
        this.container.appendChild(container);
    }

    // Render BFS visualization
    renderBFS(algorithmInstance, stepIndex) {
        this.algorithmInstance = algorithmInstance;
        this.currentStepIndex = stepIndex;

        const step = algorithmInstance.getStep(stepIndex);
        if (!step) return;

        const container = document.createElement('div');
        container.className = 'bfs-container';

        // Graph visualization
        const graphDiv = document.createElement('div');
        graphDiv.className = 'bfs-graph';
        graphDiv.style.gridTemplateColumns = `repeat(${algorithmInstance.cols}, 1fr)`;

        // Add SVG Layer for lines
        const svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgLayer.setAttribute('class', 'bfs-svg-layer');
        graphDiv.appendChild(svgLayer);

        for (let i = 0; i < algorithmInstance.rows * algorithmInstance.cols; i++) {
            const node = document.createElement('div');
            node.className = 'bfs-node';
            node.textContent = i;

            // Set shape (All circles)
            node.classList.add('shape-circle');

            // Set node state
            if (step.current === i) {
                node.classList.add('current');
            } else if (step.visited && step.visited.has(i)) {
                node.classList.add('visited');
            } else if (step.queue && step.queue.includes(i)) {
                node.classList.add('in-queue');
            } else {
                node.classList.add('unvisited');
            }

            graphDiv.appendChild(node);
        }

        container.appendChild(graphDiv);

        // Queue display
        const queueDiv = document.createElement('div');
        queueDiv.className = 'bfs-queue';
        queueDiv.innerHTML = '<strong>Queue: </strong>';

        if (step.queue && step.queue.length > 0) {
            step.queue.forEach(node => {
                const queueItem = document.createElement('span');
                queueItem.className = 'bfs-queue-item';
                queueItem.textContent = node;
                queueDiv.appendChild(queueItem);
            });
        } else {
            const emptyMsg = document.createElement('span');
            emptyMsg.textContent = 'Empty';
            emptyMsg.style.color = 'var(--text-secondary)';
            queueDiv.appendChild(emptyMsg);
        }

        container.appendChild(queueDiv);

        this.container.innerHTML = '';
        this.container.appendChild(container);

        // Draw Lines after Layout
        setTimeout(() => {
            const graphDiv = this.container.querySelector('.bfs-graph');
            // Check if graphDiv exists (it might not if we switched algorithm quickly)
            if (!graphDiv) return;

            const graphRect = graphDiv.getBoundingClientRect();
            const nodes = Array.from(graphDiv.querySelectorAll('.bfs-node'));

            // Draw connections
            nodes.forEach((node, i) => {
                const nodeRect = node.getBoundingClientRect();
                const nodeCenterX = nodeRect.left + nodeRect.width / 2 - graphRect.left;
                const nodeCenterY = nodeRect.top + nodeRect.height / 2 - graphRect.top;

                const row = Math.floor(i / algorithmInstance.cols);
                const col = i % algorithmInstance.cols;

                // Connect to Right Neighbor
                if (col < algorithmInstance.cols - 1) {
                    const rightIdx = i + 1;
                    const rightNode = nodes[rightIdx];
                    if (rightNode) {
                        const rightRect = rightNode.getBoundingClientRect();
                        const rightX = rightRect.left + rightRect.width / 2 - graphRect.left;
                        const rightY = rightRect.top + rightRect.height / 2 - graphRect.top;

                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.setAttribute('x1', nodeCenterX);
                        line.setAttribute('y1', nodeCenterY);
                        line.setAttribute('x2', rightX);
                        line.setAttribute('y2', rightY);
                        line.setAttribute('stroke', '#888');
                        line.setAttribute('stroke-width', '2');
                        svgLayer.appendChild(line);
                    }
                }

                // Connect to Bottom Neighbor
                if (row < algorithmInstance.rows - 1) {
                    const downIdx = i + algorithmInstance.cols;
                    const downNode = nodes[downIdx];
                    if (downNode) {
                        const downRect = downNode.getBoundingClientRect();
                        const downX = downRect.left + downRect.width / 2 - graphRect.left;
                        const downY = downRect.top + downRect.height / 2 - graphRect.top;

                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.setAttribute('x1', nodeCenterX);
                        line.setAttribute('y1', nodeCenterY);
                        line.setAttribute('x2', downX);
                        line.setAttribute('y2', downY);
                        line.setAttribute('stroke', '#888');
                        line.setAttribute('stroke-width', '2');
                        svgLayer.appendChild(line);
                    }
                }
            });
        }, 0);
    }

    // Render A* visualization
    renderAStar(algorithmInstance, stepIndex) {
        this.algorithmInstance = algorithmInstance;
        this.currentStepIndex = stepIndex;

        const step = algorithmInstance.getStep(stepIndex);
        if (!step) return;

        const container = document.createElement('div');
        container.className = 'astar-container';

        // Grid visualization
        const gridDiv = document.createElement('div');
        gridDiv.className = 'astar-grid';
        gridDiv.style.gridTemplateColumns = `repeat(${algorithmInstance.cols}, 1fr)`;

        for (let row = 0; row < algorithmInstance.rows; row++) {
            for (let col = 0; col < algorithmInstance.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'astar-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                const key = `${row},${col}`;
                const isStart = row === algorithmInstance.start.row && col === algorithmInstance.start.col;
                const isGoal = row === algorithmInstance.goal.row && col === algorithmInstance.goal.col;
                const isObstacle = algorithmInstance.obstacles.has(key);
                const isOpen = step.openSet && step.openSet.some(n => n.row === row && n.col === col);
                const isClosed = step.closedSet && step.closedSet.includes(key);
                const isPath = step.path && step.path.some(p => p.row === row && p.col === col);
                const isCurrent = step.current && step.current.row === row && step.current.col === col;

                if (isStart) {
                    cell.classList.add('start');
                    cell.textContent = 'S';
                } else if (isGoal) {
                    cell.classList.add('goal');
                    cell.textContent = 'G';
                } else if (isObstacle) {
                    cell.classList.add('obstacle');
                    cell.textContent = '■';
                } else if (isCurrent) {
                    cell.classList.add('current');
                    const valueDiv = document.createElement('div');
                    valueDiv.className = 'astar-value';
                    valueDiv.innerHTML = `f=${step.current.f}<br>g=${step.current.g}<br>h=${step.current.h}`;
                    cell.appendChild(valueDiv);
                } else if (isPath) {
                    cell.classList.add('path');
                    cell.textContent = '●';
                } else if (isOpen) {
                    cell.classList.add('open');
                    const openNode = step.openSet.find(n => n.row === row && n.col === col);
                    if (openNode) {
                        const valueDiv = document.createElement('div');
                        valueDiv.className = 'astar-value';
                        valueDiv.innerHTML = `f=${openNode.f}<br>g=${openNode.g}<br>h=${openNode.h}`;
                        cell.appendChild(valueDiv);
                    }
                } else if (isClosed) {
                    cell.classList.add('closed');
                }

                gridDiv.appendChild(cell);
            }
        }

        container.appendChild(gridDiv);

        // Open and Closed sets display
        const setsDiv = document.createElement('div');
        setsDiv.className = 'astar-sets';

        const openSetDiv = document.createElement('div');
        openSetDiv.className = 'astar-set';
        openSetDiv.innerHTML = '<h4>Open Set</h4>';
        const openSetItems = document.createElement('div');
        openSetItems.className = 'astar-set-items';
        if (step.openSet && step.openSet.length > 0) {
            step.openSet.forEach(node => {
                const item = document.createElement('span');
                item.className = 'astar-set-item';
                item.textContent = `(${node.row},${node.col}) f=${node.f}`;
                openSetItems.appendChild(item);
            });
        }
        openSetDiv.appendChild(openSetItems);
        setsDiv.appendChild(openSetDiv);

        const closedSetDiv = document.createElement('div');
        closedSetDiv.className = 'astar-set';
        closedSetDiv.innerHTML = '<h4>Closed Set</h4>';
        const closedSetItems = document.createElement('div');
        closedSetItems.className = 'astar-set-items';
        if (step.closedSet && step.closedSet.length > 0) {
            step.closedSet.forEach(key => {
                const item = document.createElement('span');
                item.className = 'astar-set-item';
                item.textContent = `(${key})`;
                closedSetItems.appendChild(item);
            });
        }
        closedSetDiv.appendChild(closedSetItems);
        setsDiv.appendChild(closedSetDiv);

        container.appendChild(setsDiv);

        this.container.innerHTML = '';
        this.container.appendChild(container);
    }

    // Render based on current algorithm
    render(algorithmInstance, stepIndex) {
        if (!this.currentAlgorithm) {
            console.error('No algorithm selected');
            return;
        }

        if (!algorithmInstance) {
            console.error('No algorithm instance provided');
            return;
        }

        switch (this.currentAlgorithm) {
            case 'lcs':
                this.renderLCS(algorithmInstance, stepIndex);
                break;
            case 'knapsack':
                this.renderKnapsack(algorithmInstance, stepIndex);
                break;
            case 'bfs':
                this.renderBFS(algorithmInstance, stepIndex);
                break;
            case 'astar':
                this.renderAStar(algorithmInstance, stepIndex);
                break;
            default:
                console.error('Unknown algorithm:', this.currentAlgorithm);
        }
    }
}

