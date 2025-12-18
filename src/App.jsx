import { useState, useRef } from "react";

import AlgorithmSelector from "./components/AlgorithmSelector";
import ControlPanel from "./components/ControlPanel";
import VisualizationArea from "./components/VisualizationArea";
import StepDescription from "./components/StepDescription";
import DPInputPanel from "./components/DPInputPanel";
import GraphInputPanel from "./components/GraphInputPanel";

import { lcsSteps } from "./algorithms/lcsSteps";
import { knapsackSteps } from "./algorithms/knapsackSteps";
import { bfsSteps } from "./algorithms/bfsSteps";
import { astarSteps } from "./algorithms/astarSteps";

import { playSteps, pauseSteps, nextStep } from "./engine/StepPlayer";

export default function App() {
  const [algorithm, setAlgorithm] = useState("LCS");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(null);

  const stepIndex = useRef(0);

  // DP inputs
  const [lcsInput, setLcsInput] = useState({ s1: "ABC", s2: "AC" });
  const [knapsackInput, setKnapsackInput] = useState({
    weights: "1,2,3",
    values: "6,10,12",
    capacity: "5"
  });

  // Graph inputs
  const [graphInput, setGraphInput] = useState({
    start: "A",
    goal: "G"
  });

  const loadAlgorithm = () => {
    let loadedSteps = [];

    if (algorithm === "LCS") {
      loadedSteps = lcsSteps(lcsInput.s1, lcsInput.s2);
    } else if (algorithm === "KNAPSACK") {
      const weights = knapsackInput.weights.split(",").map(Number);
      const values = knapsackInput.values.split(",").map(Number);
      const capacity = Number(knapsackInput.capacity);
      loadedSteps = knapsackSteps(weights, values, capacity);
    } else if (algorithm === "BFS") {
      loadedSteps = bfsSteps(graphInput.start);
    } else if (algorithm === "ASTAR") {
      loadedSteps = astarSteps(graphInput.start, graphInput.goal);
    }

    setSteps(loadedSteps);
    stepIndex.current = 0;
    setCurrentStep(loadedSteps[0]);
  };

  return (
    <div className="app">
      <h1>Algorithm Visualizer</h1>

      <AlgorithmSelector setAlgorithm={setAlgorithm} />

      <DPInputPanel
        algorithm={algorithm}
        lcsInput={lcsInput}
        setLcsInput={setLcsInput}
        knapsackInput={knapsackInput}
        setKnapsackInput={setKnapsackInput}
      />

      <GraphInputPanel
        algorithm={algorithm}
        graphInput={graphInput}
        setGraphInput={setGraphInput}
      />

      <ControlPanel
        onLoad={loadAlgorithm}
        onPlay={() => playSteps(steps, setCurrentStep, stepIndex)}
        onPause={pauseSteps}
        onNext={() => nextStep(steps, setCurrentStep, stepIndex)}
      />

      <VisualizationArea step={currentStep} algorithm={algorithm} />
      <StepDescription step={currentStep} />
    </div>
  );
}
