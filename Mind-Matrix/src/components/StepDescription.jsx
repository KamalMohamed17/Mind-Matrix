export default function StepDescription({ step }) {
  if (!step) return null;

  return (
    <div className="description">
      <strong>Current Step:</strong> {step.description}
    </div>
  );
}
