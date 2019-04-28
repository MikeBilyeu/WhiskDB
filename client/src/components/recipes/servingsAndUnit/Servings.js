import React from "react";

import { connect } from "react-redux";
// action creator
import { convertServings } from "../../../actions/recipeActions";

class Servings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = event => {
    const re = /^(?!0)[0-9]{0,2}$/;

    if (event.target.value === "" || re.test(event.target.value)) {
      this.props.convertServings(event.target.value);
    }
  };
  render() {
    return (
      <input
        style={{
          width: "50%",
          textAlign: "center"
        }}
        value={this.props.convertedServings}
        type="text"
        onChange={this.handleChange}
      />
    );
  }
}

const mapStateToProps = state => ({
  convertedServings: state.recipe.convertedServings
});
export default connect(
  mapStateToProps,
  { convertServings }
)(Servings);
