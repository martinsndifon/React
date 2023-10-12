import './index.css';

function App() {
  return (
    <div>
      <Bill />
      <Service>How did you like the Service?</Service>
      <Service>How did your friend like the Service?</Service>
      <Total />
      <Reset />
    </div>
  );
}

function Bill() {
  return (
    <div>
      <span>How much was the bill?</span> <input type="text" />
    </div>
  );
}

function Service({ children }) {
  return (
    <div>
      <span>{children}</span>
      <select>
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Total() {
  return (
    <h3>
      You pay ${100} (${100} + ${5} tip)
    </h3>
  );
}

function Reset() {
  return <button>Reset</button>;
}

export default App;
