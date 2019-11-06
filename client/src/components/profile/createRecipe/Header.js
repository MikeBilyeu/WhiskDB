import React from "react";

// Components
import { Button } from "../../Button";
import { ReactComponent as Arrow } from "../../../images/arrowLeft.svg";

// Styles
import styles from "./create-recipe-styles.module.scss";

const Header = props => {
  return (
    <div className={styles.header}>
      <Arrow className="back-btn" onClick={() => props.onBackClick()} />
      <h1>Create Recipe</h1>
      <Button onClick={() => props.onSaveClick()} className={styles.saveBtn}>
        Save
      </Button>
    </div>
  );
};

export default Header;
