import React from "react";
import { ReactComponent as Arrow } from "../../../../assets/images/arrowLeft.svg";
import styles from "../create-recipe.module.scss";

const Header = props => {
  return (
    <div className={styles.header}>
      <Arrow className="back-btn" onClick={() => props.onBackClick()} />
      <h1>Create Recipe</h1>
    </div>
  );
};

export default Header;
