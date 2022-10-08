import { useState } from "react";
import "./App.css";

const useIncrement = (initialValue = 0, step = 1) => {
  const [count, setCount] = useState<any>(initialValue);
  console.log(useState);

  const increment = () => {
    setCount((c: number) => c + step);
  };
  return [count, increment];
};

function Compteur() {
  const [count, increment] = useIncrement(10);

  return (
    <div className="flex gap30">
      <button className="btn" onClick={increment}>
        Incrementer
      </button>
      <p>{String(count)}</p>
    </div>
  );
}

function App(): JSX.Element {
  return (
    <div>
      <Compteur />
    </div>
  );
}

export default App;
