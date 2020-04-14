import React, { memo, useState } from 'react';
import { hot } from 'react-hot-loader/root';

import './App.scss';

interface CounterProps {
  initialCount?: number;
}

const Counter = memo(function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  const add = () => {
    setCount(count + 1);
  };

  return (
    <div className="counter">
      <input type="text" value={count} readOnly />
      <button type="button" onClick={add}>
        +
      </button>
    </div>
  );
});

function App() {
  return (
    <div className="app">
      <h2 className="title">This is a template project.</h2>
      <Counter />
    </div>
  );
}

export default hot(App);
