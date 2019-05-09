import React from "react";
import { Field, reduxForm, getFormValues } from "redux-form";
import { connect } from "react-redux";

let MealTypes = props => {
  const { formValues } = props;

  const handleClick = meal => {
    // change field value when user clicks on mealType
    props.change("mealType", meal);
  };

  return (
    <Field
      style={{ color: "#464646", cursor: "pointer", margin: "0 1rem" }}
      name="mealType"
      component={() => {
        let color = "";
        if (props.formValues) {
          color =
            props.formValues.mealType === props.type ? "#0172C4" : "#464646";
        }
        return (
          <div
            onClick={() => {
              handleClick(props.type);
            }}
            style={{
              color: color,
              cursor: "pointer",
              margin: "0 1rem"
            }}
          >
            {props.type}
          </div>
        );
      }}
    />
  );
};

const mapSateToProps = state => {
  return { formValues: getFormValues("browse")(state) };
};

MealTypes = connect(mapSateToProps)(MealTypes);
export default reduxForm({ form: "browse" })(MealTypes);
