export default function ControlPanel({ onLoad, onPlay, onPause, onNext }) {
  return (
    <div className="controls">
      <button onClick={onLoad}>Load</button>
      <button onClick={onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onNext}>Next Step</button>
    </div>
  );
}
