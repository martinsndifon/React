import { useState } from 'react';
import './index.css';

function App() {
  const [bill, setBill] = useState(0);
  const [percent, setPercent] = useState(0);
  const [fpercent, setfPercent] = useState(0);

  const avg = Math.round((percent + fpercent) / 2);
  const tip = Math.round(bill * (avg / 100));

  return (
    <div>
      <Bill bill={bill} setBill={setBill} />
      <Service id={1} percent={percent} setPercent={setPercent}>
        How did you like the Service?
      </Service>
      <Service id={2} fpercent={fpercent} setfPercent={setfPercent}>
        How did your friend like the Service?
      </Service>
      <Total bill={bill} tip={tip} />
      <Reset
        setBill={setBill}
        setPercent={setPercent}
        setfPercent={setfPercent}
      />
    </div>
  );
}

function Bill({ bill, setBill }) {
  return (
    <div>
      <span>How much was the bill?</span>{' '}
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
    </div>
  );
}

function Service({ id, percent, setPercent, fpercent, setfPercent, children }) {
  function handleChange(e) {
    if (id === 1) {
      setPercent(Number(e.target.value));
    } else {
      setfPercent(Number(e.target.value));
    }
  }

  return (
    <div>
      <span>{children}</span>
      <select
        value={id === 1 ? percent : fpercent}
        onChange={(e) => handleChange(e)}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Total({ bill, tip }) {
  return (
    <h3>
      You pay ${bill + tip} (${bill} + ${tip} tip)
    </h3>
  );
}

function Reset({ setBill, setPercent, setfPercent }) {
  function handleClick() {
    setBill(0);
    setPercent(0);
    setfPercent(0);
  }

  return <button onClick={handleClick}>Reset</button>;
}

export default App;
