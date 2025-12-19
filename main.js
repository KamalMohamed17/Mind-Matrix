/**
 * Main Controller
 * Handles UI interactions, algorithm execution, and step-by-step visualization
 */

// Application state
const AppState = {
    currentAlgorithm: null,
    algorithmInstance: null,
    visualizer: null,
    currentStep: 0,
    totalSteps: 0,
    isPlaying: false,
    isPaused: false,
    playInterval: null,
    speed: 5,
    stepMode: false
};

// Algorithm descriptions
const algorithmDescriptions = {
    lcs: 'Longest Common Subsequence (LCS): Finds the longest subsequence common to two strings using dynamic programming.',
    knapsack: '0/1 Knapsack: Determines the maximum value of items that can be put in a knapsack of fixed capacity using dynamic programming.',
    bfs: 'Breadth-First Search (BFS): Traverses a graph level by level, exploring all neighbors before moving to the next level.',
    astar: 'A* Pathfinding: Finds the shortest path from start to goal using heuristics (f = g + h) to guide the search efficiently.'
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize visualizer
    AppState.visualizer = new Visualizer(document.getElementById('visualizationArea'));

    // Dark mode toggle
    initDarkMode();

    // Algorithm selector buttons
    initAlgorithmSelector();

    // Control buttons
    initControls();

    // Input forms
    initInputForms();

    // Speed slider
    initSpeedSlider();

    // Initialize default algorithm (LCS)
    const defaultBtn = document.querySelector('.alg-btn.active');
    if (defaultBtn) {
        const algorithm = defaultBtn.dataset.algorithm;
        AppState.currentAlgorithm = algorithm;
        document.getElementById('algorithmDescription').textContent = algorithmDescriptions[algorithm];
        hideAllInputForms();
        showInputForm(algorithm);
        // Sync visualizer with default algorithm
        AppState.visualizer.setAlgorithm(algorithm);
    }
});

// Dark Mode
function initDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    const theme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', theme);

    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Algorithm Selector
function initAlgorithmSelector() {
    const buttons = document.querySelectorAll('.alg-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const algorithm = btn.dataset.algorithm;

            // Update active button
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update description
            document.getElementById('algorithmDescription').textContent = algorithmDescriptions[algorithm];

            // Clear previous visualization
            resetVisualization();
            AppState.currentAlgorithm = algorithm;
            AppState.visualizer.setAlgorithm(algorithm);

            // Show/hide input forms
            hideAllInputForms();
            showInputForm(algorithm);
        });
    });
}

// Input Forms
function initInputForms() {
    // LCS form
    document.getElementById('lcsSubmitBtn').addEventListener('click', () => {
        const str1 = document.getElementById('lcsString1').value.trim();
        const str2 = document.getElementById('lcsString2').value.trim();

        if (str1 && str2) {
            startLCS(str1, str2);
        } else {
            alert('Please enter both strings');
        }
    });

    // Knapsack form
    document.getElementById('knapsackSubmitBtn').addEventListener('click', () => {
        const capacity = parseInt(document.getElementById('knapsackCapacity').value);
        const itemsText = document.getElementById('knapsackItems').value.trim();

        if (capacity > 0 && itemsText) {
            const items = parseKnapsackItems(itemsText);
            if (items.length > 0) {
                startKnapsack(items, capacity);
            } else {
                alert('Invalid items format. Use: weight,value (one per line)');
            }
        } else {
            alert('Please enter valid capacity and items');
        }
    });

    // BFS form
    document.getElementById('bfsSubmitBtn').addEventListener('click', () => {
        const rows = parseInt(document.getElementById('bfsRows').value);
        const cols = parseInt(document.getElementById('bfsCols').value);
        const start = parseInt(document.getElementById('bfsStart').value);

        if (rows > 0 && cols > 0 && start >= 0 && start < rows * cols) {
            startBFS(rows, cols, start);
        } else {
            alert('Please enter valid parameters');
        }
    });

    // A* form
    document.getElementById('astarSubmitBtn').addEventListener('click', () => {
        const rows = parseInt(document.getElementById('astarRows').value);
        const cols = parseInt(document.getElementById('astarCols').value);
        const startRow = parseInt(document.getElementById('astarStartRow').value);
        const startCol = parseInt(document.getElementById('astarStartCol').value);
        const goalRow = parseInt(document.getElementById('astarGoalRow').value);
        const goalCol = parseInt(document.getElementById('astarGoalCol').value);

        if (rows > 0 && cols > 0 &&
            startRow >= 0 && startRow < rows && startCol >= 0 && startCol < cols &&
            goalRow >= 0 && goalRow < rows && goalCol >= 0 && goalCol < cols) {
            startAStar(rows, cols, { row: startRow, col: startCol }, { row: goalRow, col: goalCol }, []);
        } else {
            alert('Please enter valid parameters');
        }
    });
}

function parseKnapsackItems(text) {
    const lines = text.split('\n');
    const items = [];

    for (const line of lines) {
        const parts = line.trim().split(',');
        if (parts.length === 2) {
            const weight = parseInt(parts[0]);
            const value = parseInt(parts[1]);
            if (!isNaN(weight) && !isNaN(value) && weight > 0 && value > 0) {
                items.push({ weight, value });
            }
        }
    }

    return items;
}

function hideAllInputForms() {
    document.querySelectorAll('.input-form').forEach(form => {
        form.classList.add('hidden');
    });
}

function showInputForm(algorithm) {
    const formMap = {
        lcs: 'lcsInputForm',
        knapsack: 'knapsackInputForm',
        bfs: 'bfsInputForm',
        astar: 'astarInputForm'
    };

    const formId = formMap[algorithm];
    if (formId) {
        document.getElementById(formId).classList.remove('hidden');
    }
}

// Algorithm Starters
function startLCS(str1, str2) {
    console.log('Starting LCS with strings:', str1, str2);
    const algo = new LCSAlgorithm(str1, str2);
    algo.generateSteps();
    AppState.algorithmInstance = algo;
    AppState.totalSteps = algo.steps.length;
    AppState.currentStep = 0;

    console.log('Total steps:', AppState.totalSteps);
    console.log('Current algorithm:', AppState.currentAlgorithm);

    document.getElementById('lcsInputForm').classList.add('hidden');
    executeStep(0);
}

function startKnapsack(items, capacity) {
    const algo = new KnapsackAlgorithm(items, capacity);
    algo.generateSteps();
    AppState.algorithmInstance = algo;
    AppState.totalSteps = algo.steps.length;
    AppState.currentStep = 0;

    document.getElementById('knapsackInputForm').classList.add('hidden');
    executeStep(0);
}

function startBFS(rows, cols, startNode) {
    const algo = new BFSAlgorithm(rows, cols, startNode);
    algo.generateSteps();
    AppState.algorithmInstance = algo;
    AppState.totalSteps = algo.steps.length;
    AppState.currentStep = 0;

    document.getElementById('bfsInputForm').classList.add('hidden');
    executeStep(0);
}

function startAStar(rows, cols, start, goal, obstacles) {
    const algo = new AStarAlgorithm(rows, cols, start, goal, obstacles);
    algo.generateSteps();
    AppState.algorithmInstance = algo;
    AppState.totalSteps = algo.steps.length;
    AppState.currentStep = 0;

    document.getElementById('astarInputForm').classList.add('hidden');
    executeStep(0);

    // Add obstacle toggle for A* after initial render
    setupAStarObstacles(algo);
}

function setupAStarObstacles(algo) {
    // Wait for DOM to update
    setTimeout(() => {
        const grid = document.querySelector('.astar-grid');
        if (!grid) return;

        // Remove existing listener if any (by cloning)
        const newGrid = grid.cloneNode(true);
        grid.parentNode.replaceChild(newGrid, grid);

        // Use event delegation on the grid
        newGrid.addEventListener('click', function (e) {
            if (AppState.isPlaying || AppState.isPaused) return;

            const cell = e.target.closest('.astar-cell');
            if (!cell) return;

            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const key = `${row},${col}`;

            const isStart = row === algo.start.row && col === algo.start.col;
            const isGoal = row === algo.goal.row && col === algo.goal.col;

            if (isStart || isGoal) return;

            if (algo.obstacles.has(key)) {
                algo.obstacles.delete(key);
            } else {
                algo.obstacles.add(key);
            }

            // Regenerate steps with new obstacles
            algo.generateSteps();
            AppState.totalSteps = algo.steps.length;
            AppState.currentStep = 0;
            executeStep(0);
            setupAStarObstacles(algo); // Re-setup after re-render
        });
    }, 100);
}

// Controls
function initControls() {
    document.getElementById('startBtn').addEventListener('click', startVisualization);
    document.getElementById('nextBtn').addEventListener('click', nextStep);
    document.getElementById('pauseBtn').addEventListener('click', pauseVisualization);
    document.getElementById('resetBtn').addEventListener('click', resetVisualization);
}

function initSpeedSlider() {
    const slider = document.getElementById('speedSlider');
    const valueDisplay = document.getElementById('speedValue');

    slider.addEventListener('input', (e) => {
        AppState.speed = parseInt(e.target.value);
        valueDisplay.textContent = AppState.speed;

        // Update interval if playing
        if (AppState.isPlaying) {
            pauseVisualization();
            startVisualization();
        }
    });

    document.getElementById('stepModeToggle').addEventListener('change', (e) => {
        AppState.stepMode = e.target.checked;
    });
}

function startVisualization() {
    if (!AppState.algorithmInstance) return;

    if (AppState.currentStep >= AppState.totalSteps) {
        resetVisualization();
        return;
    }

    AppState.isPlaying = true;
    AppState.isPaused = false;

    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('nextBtn').disabled = true;

    // Calculate delay based on speed (1-10, where 10 is fastest)
    const delay = (11 - AppState.speed) * 200; // 2000ms to 200ms

    AppState.playInterval = setInterval(() => {
        if (AppState.currentStep >= AppState.totalSteps) {
            pauseVisualization();
            return;
        }

        nextStep();

        if (AppState.stepMode) {
            pauseVisualization();
        }
    }, delay);
}

function pauseVisualization() {
    AppState.isPlaying = false;
    AppState.isPaused = true;

    if (AppState.playInterval) {
        clearInterval(AppState.playInterval);
        AppState.playInterval = null;
    }

    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('nextBtn').disabled = false;
}

function nextStep() {
    if (!AppState.algorithmInstance) return;

    if (AppState.currentStep < AppState.totalSteps) {
        executeStep(AppState.currentStep);
        AppState.currentStep++;
    }
}

function executeStep(stepIndex) {
    if (!AppState.algorithmInstance) {
        console.error('No algorithm instance available');
        return;
    }

    if (!AppState.currentAlgorithm) {
        console.error('No algorithm selected');
        return;
    }

    const step = AppState.algorithmInstance.getStep(stepIndex);
    if (!step) {
        console.error('Step not found at index:', stepIndex);
        return;
    }

    // Update explanation
    const explanationText = document.getElementById('explanationText');
    explanationText.innerHTML = `<strong>Step ${stepIndex + 1}:</strong> ${step.message}`;

    // Render visualization
    AppState.visualizer.render(AppState.algorithmInstance, stepIndex);
}

function resetVisualization() {
    pauseVisualization();

    AppState.currentStep = 0;
    AppState.algorithmInstance = null;
    AppState.visualizer.clear();

    document.getElementById('explanationText').textContent = 'Ready to start visualization...';
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('nextBtn').disabled = false;

    // Show input form again
    if (AppState.currentAlgorithm) {
        showInputForm(AppState.currentAlgorithm);
    }
}

