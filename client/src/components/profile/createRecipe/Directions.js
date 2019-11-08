import React from "react";
import { Field } from "redux-form";

// Components
import TextArea from "../../form-inputs/TextArea";
import Input from "../../form-inputs/Input";

// Parse Functions
import { minuteParse, numberParse, footnoteParse } from "./input-parse";

// Styles
import styles from "./create-recipe-styles.module.scss";

const Directions = () => {
  const placeholder = {
    directions:
      "Sift the flour, sugar, baking powder, and salt into a large bowl.",
    footnote: "Drop batter by large spoonfuls onto the griddle…"
  };
  return (
    <div className={styles.directionsContainer}>
      <h2>Directions</h2>
      <div className={styles.time}>
        <Field
          name="time.hours"
          component={Input}
          label="Hr"
          placeholder="1"
          normalize={numberParse}
          pattern="[0-9]*"
          className={styles.hours}
        />
        <Field
          name="time.minutes"
          component={Input}
          label="Min"
          placeholder="15"
          normalize={minuteParse}
          pattern="[0-9]*"
          className={styles.minutes}
        />
      </div>
      <label className={styles.timeLabel}>Time</label>
      <Field
        name="directions"
        className={styles.directions}
        type="text"
        component={TextArea}
        label="Directions"
        placeholder={placeholder.directions}
      />
      <Field
        name="footnote"
        className={styles.footnote}
        type="text"
        component={TextArea}
        label="Footnote"
        normalize={footnoteParse}
        placeholder={placeholder.footnote}
      />
    </div>
  );
};

export default Directions;
