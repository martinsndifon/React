// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from 'react';

export default function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('EUR');
  const [to, setTo] = useState('USD');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleFromChange(e) {
    setFrom(e.target.value);
  }

  function handleToChange(e) {
    setTo(e.target.value);
  }

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((data) => setOutput(data.rates?.[to] || amount))
      .then(() => setIsLoading(false))
      .catch((err) => {
        if (err.name === 'AbortError') {
          return;
        }
      });

    return () => {
      controller.abort();
    };
  }, [amount, from, to]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select
        value={from}
        onChange={(e) => handleFromChange(e)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={to}
        onChange={(e) => handleToChange(e)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output > 0 ? `${output} ${to}` : 'OUTPUT'}</p>
    </div>
  );
}
