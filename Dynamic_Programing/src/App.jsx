import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const IncremnetCounter = () => {
    setCount(count + 1);
  }

  const decremnetCounter = () => {
    count <= 0 ? setCount(0) :
    setCount(count - 1);
  }

  const disable = count <= 0 ? true : false;

  return (
    <div>
      {/* <h1>Counter</h1>
      <p>Count: {count}</p> */}

      <button onClick={IncremnetCounter}>
        +
      </button>
      <p>{count}</p>
      <button disabled={disable} onClick={decremnetCounter}>
        -
      </button>
    </div>
  );
}

export default App;
