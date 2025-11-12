import React from "react";
import styles from "./HomePage.module.css"; // 👈 CSS Module import

const HomePage = ({ onStart }) => {
  return (
    <div className={styles["homepage"]}>
      <h1 className={styles["homepage-title"]}>Fitts’ Law Experiment Project</h1>

      <div className={styles["homepage-card"]}>
        <h2 className={styles["section-title"]}>Course Information</h2>
        <p className={styles["info"]}>
          <strong>Class:</strong> Human Computer Interaction CIS-482 <br />
          <strong>Professor:</strong> Guario <br />
          <strong>Group Members:</strong> <br />
          - Ubaid Ur Rehman <br />
          - Michael Belhke <br />
          - Yu
        </p>

        <button className={styles["start-btn"]} onClick={onStart}>
          Start Experiment
        </button>
      </div>
    </div>
  );
};

export default HomePage;
