export default function DPTable({ step }) {
  const table = step.data.table;

  return (
    <div className="grid">
      {table.map((row, i) =>
        row.map((cell, j) => {
          const active = step.highlights.cells?.some(
            ([x, y]) => x === i && y === j
          );
          return (
            <div key={`${i}-${j}`} className={`cell ${active ? "active" : ""}`}>
              {cell}
            </div>
          );
        })
      )}
    </div>
  );
}
