import React from "react";
import { Field } from "redux-form";
import TextArea from "../../form_inputs/textarea";
import { footnoteParse } from "../utils/input-parse";
import "../recipe_upsert.scss";

const Directions = () => {
  const placeholder = {
    instructions:
      "Sift the flour, sugar, baking powder, and salt into a large bowl.",
    footnote: "Drop batter by large spoonfuls onto the griddle…"
  };
  return (
    <div className="ru-directions">
      <Field
        name="instructions"
        className="ru-directions__input"
        type="text"
        component={TextArea}
        label="Instructions"
        placeholder={placeholder.instructions}
      />
      <Field
        name="footnote"
        className="ru-directions__footnote"
        type="text"
        component={TextArea}
        label="Footnote"
        placeholder={placeholder.footnote}
      />
    </div>
  );
};

export default Directions;
