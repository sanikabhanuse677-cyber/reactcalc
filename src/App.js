import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => setInput("");

  const calculate = () => {
    try {
      const result = eval(input);
      setHistory([`${input} = ${result}`, ...history]);
      setInput(result.toString());
    } catch {
      setInput("Invalid ❌");
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key >= "0" && e.key <= "9") || "+-*/.".includes(e.key)) {
      setInput((prev) => prev + e.key);
    } else if (e.key === "Enter") {
      calculate();
    } else if (e.key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const buttons = [
    "7","8","9","/",
    "4","5","6","*",
    "1","2","3","-",
    "0",".","=","+"
  ];

  return (
    <div className="app">

      {/* HERO */}
      <section className="hero">
        <h1>🚀 Smart Calculator</h1>
        <p>Fast • Beautiful • Powerful</p>
      </section>

      {/* CALCULATOR */}
      <section className="calculator-section">
        <div className="calculator">

          <input className="display" value={input} readOnly />

          <div className="buttons">
            <button className="clear" onClick={clearInput}>C</button>

            {buttons.map((btn, i) => (
              <button
                key={i}
                onClick={() => btn === "=" ? calculate() : handleClick(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        {/* HISTORY */}
        <div className="history">
          <h3>History</h3>
          {history.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Features</h2>
        <ul>
          <li>✔ Basic arithmetic operations</li>
          <li>✔ Keyboard support</li>
          <li>✔ Calculation history</li>
          <li>✔ Responsive UI</li>
        </ul>
      </section>

      {/* FOOTER */}
      <footer>
        <p>Built with React 💙</p>
      </footer>

    </div>
  );
}