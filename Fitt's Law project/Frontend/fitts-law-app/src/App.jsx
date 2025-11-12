import React, { useState } from "react";
import HomePage from "./HomePage";
import FittsLawTest from "./FittsLawTest";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div>
      {!started ? (
        <HomePage onStart={() => setStarted(true)} />
      ) : (
        <FittsLawTest />
      )}
    </div>
  );
}

export default App;
