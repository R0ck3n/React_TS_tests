import { useState, useEffect } from "react";
import "./App.css";

const useIncrement = (initialValue = 0, step = 1) => {
  const [count, setCount] = useState<any>(initialValue);

  const increment = () => {
    setCount((c: number) => c + step);
  };
  return [count, increment];
};

const useAutoIncrement = (initialValue = 0, step = 1) => {
  const [count, increment] = useIncrement(initialValue, step);
  useEffect(() => {
    const timer = window.setInterval(() => {
      increment();
    }, 1000);

    return function () {
      clearInterval(timer);
    };
  }, []);

  return count;
};

const useToggle = (initialValue = true): any => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => {
    setValue((t: boolean) => !t);
  };
  return [value, toggle];
};

function Compteur(): JSX.Element {
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

function AutoCompteur(): JSX.Element {
  const count = useAutoIncrement(0);
  return <p>{String(count)}</p>;
}

function TodoList() {
  const [todos, setTodos] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      const responseData = await response.json();
      if (response.ok) {
        setTodos(responseData);
      } else {
        alert(JSON.stringify(responseData));
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <p>chargement en cours...</p>;
  }

  return (
    <ul>
      {todos.map((t) => (
        <li key={t.id}>{t.title}</li>
      ))}
    </ul>
  );
}

function App(): JSX.Element {
  const [compteurVisible, toggleCompteur] = useToggle(false);
  const [autoCompteurVisible, toggleAutoCompteur] = useToggle(false);
  return (
    <div>
      {/* 1er Element : compteur manuel */}
      <div>
        <label htmlFor="compteur"> Afficher le compteur</label>
        <input
          name="compteur"
          type="checkbox"
          onChange={toggleCompteur}
          checked={compteurVisible}
        />
        {compteurVisible && <Compteur />}
      </div>
      {/* 2e Element : compteur auto*/}
      <div>
        <label htmlFor="autoCompteur"> Démarrer un compteur automatique</label>
        <input
          name="autoCompteur"
          type="checkbox"
          onChange={toggleAutoCompteur}
          checked={autoCompteurVisible}
        />
        {autoCompteurVisible && <AutoCompteur />}
      </div>
      {/* 2e Element : TodoAPI*/}
      <TodoList />
    </div>
  );
}

export default App;
