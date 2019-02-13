import React from "react";
import { getFormValues } from "redux-form";
import { connect } from "react-redux";

class NewRecipePreview extends React.Component {
  render() {
    if (this.props.formValues) {
      const { title, time } = this.props.formValues;
      console.log(this.props.formValues);
    }

    return (
      <div style={{ border: "solid red" }} className="eight wide column">
        <div className="ui hidden divider" />
        <h1>title</h1>
        <div>-User_Name</div>
        <div>time: 15m</div>
        <div className="ui placeholder">
          <div className="image" />
        </div>
        <div className="ui hidden divider" />
        <button className="ui button black">Change Yield</button>
        <div>Servings: 3</div>
        <div className="ui hidden divider" />
        <div className="ui divider" />

        <h3 className="ui dividing header">Ingredients</h3>

        <div className="ui bulleted list">
          <div className="item">1 Cup Flour</div>
          <div className="item">1/2 Tablespoon Sea Salt</div>
          <div className="item">1-1/2 cup Carrots (Diced)</div>
        </div>

        <div className="ui hidden divider" />
        <h3 className="ui dividing header">Directions</h3>
        <div>time: 15m</div>
        <div className="ui hidden divider" />
        <h4>Step 1</h4>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters.
        </p>
        <div className="ui hidden divider" />
        <h4>Step 2</h4>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
        <div className="ui hidden divider" />
        <h4>Step 3</h4>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum.
        </p>
      </div>
    );
  }
}

const mapSateToProps = state => {
  return { formValues: getFormValues("newRecipe")(state) };
};

export default connect(mapSateToProps)(NewRecipePreview);
