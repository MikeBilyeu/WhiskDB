import React from "react";
import { connect } from "react-redux";
import { convertServings } from "../../../../actions/recipeActions";

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
      <div className="servings">
        Yield:
        <input
          style={{
            textAlign: "center"
          }}
          value={this.props.convertedServings}
          pattern="[0-9]*"
          type="text"
          onChange={this.handleChange}
        />
      </div>
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
