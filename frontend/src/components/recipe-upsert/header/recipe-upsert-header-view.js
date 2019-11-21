import React from "react";
import PropTypes from "prop-types";
import Button from "../../button";
import { ReactComponent as Arrow } from "../../../assets/images/arrowLeft.svg";
import styles from "../recipe-upsert.module.scss";

const Header = props => {
  if (true) {
    return (
      <div className={styles.header}>
        <Arrow className={styles["back-btn"]} onClick={props.onBackClick} />
        <h1>Create Recipe</h1>
      </div>
    );
  }
  return (
    <div className={styles.header}>
      <Button className={styles["back-btn"]} onClick={props.onCancelClick}>
        Cancel
      </Button>
      <h1>Edit Recipe</h1>
    </div>
  );
};

Header.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired
};

export default Header;
