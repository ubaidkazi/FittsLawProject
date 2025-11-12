import React, { useState, useMemo, useEffect } from "react";
import styles from "./FittsLawTest.module.css"

const FittsLawTest = () => {
  const [consented, setConsented] = useState(false);
  const [currentTrial, setCurrentTrial] = useState(0);
  const [block, setBlock] = useState(1);
  const [target, setTarget] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [results, setResults] = useState([]);

  // Experiment parameters
//   const diameters = [20, 40, 60, 80];
    const diameters = [20,40];
//   const distances = [100, 200, 300, 400];
const distances = [100, 200];
//   const directions = ["left", "right"];
const directions = ["left"]

  // Generate all 32 tasks (4x4x2)
  const allTrials = useMemo(() => {
    const trials = [];
    diameters.forEach((d) =>
      distances.forEach((dist) =>
        directions.forEach((dir) =>
          trials.push({ diameter: d, distance: dist, direction: dir })
        )
      )
    );
    return trials;
  }, []);

  // Shuffle array
  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  // State to hold randomized order for each block
  const [blockTrials, setBlockTrials] = useState(shuffle([...allTrials]));


  //Start a trial
  const startTrial = () => {
    if (currentTrial >= blockTrials.length) {
      // Completed a block
      if (block >= 10) {
        setFeedback("Experiment complete! Thank you for participating.");
        sendResults();
        return;
      } else {
        console.log(`Block ${block} complete. Uploading results...`);
        sendResults();
        const nextBlock = block + 1;
        setBlock(nextBlock);
        setCurrentTrial(0);
        setBlockTrials(shuffle([...allTrials]));
        setFeedback(`Starting block ${nextBlock}... Click to begin.`);
        return;
      }
    }

    const trial = blockTrials[currentTrial];
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;
    const offset = trial.direction === "left" ? -trial.distance : trial.distance;

    setTarget({
      x: screenCenterX + offset,
      y: screenCenterY,
      diameter: trial.diameter,
      ...trial,
    });

    console.log(
      `▶️ Block ${block}, Trial ${currentTrial + 1}/32 | Diameter: ${trial.diameter}, Distance: ${trial.distance}, Direction: ${trial.direction}`
    );

    setStartTime(performance.now());
    setFeedback("");
  };


  // Handle click

  const handleClick = (e) => {
    if (!target || !startTime) return;

    const endTime = performance.now();
    const mt = endTime - startTime;

    const dx = e.clientX - target.x;
    const dy = e.clientY - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const hit = distance <= target.diameter / 2;

    const newResult = {
      block,
      trialNumber: currentTrial + 1,
      diameter: target.diameter,
      distance: target.distance,
      direction: target.direction,
      movementTimeMs: mt,
      hit,
      clickX: e.clientX,
      clickY: e.clientY,
      targetX: target.x,
      targetY: target.y,
    };

    console.log(
      `🖱️ Clicked ${hit ? "HIT" : "MISS"} | MT: ${mt.toFixed(
        2
      )} ms | Block ${block}, Trial ${currentTrial + 1}`
    );

    setResults((prev) => [...prev, newResult]);
    setFeedback(hit ? "Hit!" : "Miss!");
    setStartTime(null);
    setTarget(null);
    setCurrentTrial((prev) => prev + 1);

    // Move to next trial after delay
    setTimeout(() => startTrial(), 700);
  };


  // Send results to backend

  const sendResults = async () => {
    if (results.length === 0) return;

    try {
      console.log("Uploading results to backend...");
      const res = await fetch("http://localhost:8081/fittslaw/trials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(results),
      });
      if (res.ok) {
        console.log("Results successfully saved to database.");
        setResults([]); // Clear after upload
      } else {
        console.error("Server error saving results:", res.status);
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };


  // Consent screen

  if (!consented) {
  return (
    <div className={styles.consentScreen}>
      <h1 className={styles.title}>Fitts' Law Experiment</h1>
      <p className={styles.description}>
        Welcome! You will perform a pointing and clicking task using a mouse or
        trackpad. You’ll see circles appear on the screen. Click on them as
        quickly and accurately as you can. The experiment includes 10 blocks of
        32 trials each. Please make sure you’re comfortable and ready before
        beginning.
      </p>
      <button
        onClick={() => {
          setConsented(true);
          console.log("Participant consented.");
          setTimeout(() => startTrial(), 1000);
        }}
        className={styles.consentButton}
      >
        I Agree and Begin
      </button>
    </div>
  );
}

return (
  <div className={styles.experimentScreen} onClick={handleClick}>
    {feedback && <div className={styles.feedback}>{feedback}</div>}

    <div className={styles.trialInfo}>
      Block {block}/10 | Trial {currentTrial + 1}/32
    </div>

    {target && (
      <div
        className={styles.target}
        style={{
          width: target.diameter,
          height: target.diameter,
          left: target.x - target.diameter / 2,
          top: target.y - target.diameter / 2,
        }}
      />
    )}

    {!target && feedback.includes("Starting block") && (
      <div className={styles.nextBlockContainer}>
        <button onClick={startTrial} className={styles.nextBlockButton}>
          Begin Block {block}
        </button>
      </div>
    )}
  </div>
);
};

export default FittsLawTest;
