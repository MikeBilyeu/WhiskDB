import React from "react";
import { Field } from "redux-form";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";

class DirectionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      directionValue: "",
      error: null
    };
  }

  handleChange = e => {
    if (/.{3,640}/.test(this.state.directionValue)) {
      this.setState({ error: null });
    }
    this.setState({ directionValue: e.target.value });
  };

  handleAddClick = () => {
    if (!/.{3,640}/.test(this.state.directionValue)) {
      this.setState({
        error: "Directions must be 3 - 640 characters"
      });
    } else {
      this.props.change(
        `directions[${this.props.directions.length}].step`,
        this.state.directionValue
      );

      this.setState((state, props) => {
        return { directionValue: "" };
      });
      //else display warning
    }
  };
  handleKeyDown = e => {
    if (e.key == "Enter") {
      if (!/.{3,640}/.test(this.state.directionValue)) {
        this.setState({
          error: "Directions must be 3 - 640 characters"
        });
      } else {
        this.props.change(
          `directions[${this.props.directions.length}].step`,
          this.state.directionValue
        );
        this.setState((state, props) => {
          return { directionValue: "" };
        });
      }
    }
  };

  render() {
    return (
      <div style={{ display: "grid" }}>
        <label htmlFor="directionInput">Directions</label>
        <textarea
          style={{
            maxWidth: "18rem",
            minWidth: "18rem",
            minHeight: "7rem",
            maxHeight: "10rem"
          }}
          id="directionInput"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={this.state.directionValue}
          placeholder="e.g. 1 1/2 tsp Sea salt (to taste)"
        ></textarea>
        <div
          style={{
            color: "#0172C4",
            border: "solid #BFBFBF .08rem",
            borderRadius: "5rem",
            width: "8rem",
            height: "2.5rem",
            lineHeight: "2.5rem",
            textAlign: "center",
            cursor: "pointer",
            margin: ".5rem 0"
          }}
          type="button"
          onClick={this.handleAddClick}
        >
          Add +
        </div>

        {this.state.error ? (
          <span className="error">{this.state.error}</span>
        ) : null}
      </div>
    );
  }
}
// import TextAreaInput from "../inputs/TextAreaInput";
// // Renders all steps of directions
// const DirectionInput = ({ fields, meta: { touched, error } }) => {
//   const textParse = value => {
//     let strArr = value.match(/.{0,640}/) || [""];
//     return value && strArr[0];
//   };
//   return (
//     <div>
//       {fields.map((step, index) => (
//         <div key={index}>
//           <div className="field">
//             <Field
//               name={`${step}.step`}
//               component={TextAreaInput}
//               label={`Step ${index + 1}`}
//               parse={textParse}
//               placeholder="Set oven to 375(f)..."
//             />
//           </div>
//         </div>
//       ))}
//
//       <div
//         className="button add"
//         type="button"
//         onClick={() => {
//           if (fields.length < 10) {
//             fields.push({});
//           }
//         }}
//       >
//         Add
//       </div>
//     </div>
//   );
// };

const selector = formValueSelector("newRecipe");

const mapSateToProps = state => {
  return { directions: selector(state, "directions") };
};

export default connect(mapSateToProps)(DirectionInput);
