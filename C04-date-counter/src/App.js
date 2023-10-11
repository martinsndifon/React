import { useState } from 'react';
import './index.css';

function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <div className="main">
      <div className="fmain">
        <button onClick={() => setStep((c) => c - 1)}>-</button>
        <p>Step: {step}</p>
        <button onClick={() => setStep((c) => c + 1)}>+</button>
      </div>

      <div className="fmain">
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <p>Count: {count}</p>
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>

      <p className="main-text">
        {count === 0
          ? `Today is ${date.toDateString()}`
          : count > 0
          ? `${count} days from today is ${date.toDateString()}`
          : `${Math.abs(count)} days ago was ${date.toDateString()}`}
      </p>
    </div>
  );
}

export default App;
