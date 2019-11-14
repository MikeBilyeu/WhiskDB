import React from "react";

// Components
import { ReactComponent as Arrow } from "../../../images/arrowLeft.svg";

// Styles
import styles from "./create-recipe-styles.module.scss";

const Header = props => {
  return (
    <div className={styles.header}>
      <Arrow className="back-btn" onClick={() => props.onBackClick()} />
      <h1>Create Recipe</h1>
    </div>
  );
};

export default Header;
