import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/BackButton.module.css";

const BackButton = () => {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backButton}>
        Go back to home page
      </Link>
    </div>
  );
};

export default BackButton;
