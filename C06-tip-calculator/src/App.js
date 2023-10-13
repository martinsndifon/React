import { useState } from 'react';
import './index.css';

function App() {
  const [bill, setBill] = useState('');
  const [percent, setPercent] = useState(0);
  const [fpercent, setfPercent] = useState(0);

  const avg = Math.round((percent + fpercent) / 2);
  const tip = Math.round(bill * (avg / 100));

  function handleReset() {
    setBill(0);
    setPercent(0);
    setfPercent(0);
  }

  return (
    <div>
      <Bill bill={bill} setBill={setBill} />
      <Service percent={percent} setPercent={setPercent}>
        How did you like the Service?
      </Service>
      <Service percent={fpercent} setPercent={setfPercent}>
        How did your friend like the Service?
      </Service>
      {!bill ? null : (
        <>
          <Total bill={bill} tip={tip} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function Bill({ bill, setBill }) {
  return (
    <div>
      <span>How much was the bill?</span>{' '}
      <input
        type="text"
        placeholder="Enter bill"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
    </div>
  );
}

function Service({ percent, setPercent, children }) {
  function handleChange(e) {
    setPercent(Number(e.target.value));
  }

  return (
    <div>
      <span>{children}</span>
      <select value={percent} onChange={(e) => handleChange(e)}>
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

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}

export default App;
