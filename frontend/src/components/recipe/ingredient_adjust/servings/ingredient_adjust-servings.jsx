import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { convertServings } from "../../../../actions/recipeActions";

class Servings extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = { focus: false, input: "" };
  }

  componentDidMount() {
    this.setState({ input: this.props.originalServings });
  }

  handleChange = event => {
    const numLimit = /^(?!0)[0-9]{0,2}$/;

    if (numLimit.test(event.target.value)) {
      this.setState({ input: event.target.value }, () => {
        if (this.state.input !== "" && numLimit.test(this.state.input)) {
          this.props.convertServings(this.state.input);
        } else if (this.state.input === "") {
          this.props.convertServings(this.props.originalServings);
        }
      });
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.handleBlur();
    }
  };

  handleFocus = () => {
    if (!this.state.focus) {
      this.textInput.current.focus();
      this.setState({ focus: true, input: "" });
    }
  };

  handleBlur = () => {
    if (this.state.input === "") {
      this.setState(
        { focus: false, input: this.props.originalServings },
        () => {
          this.props.convertServings(this.state.input);
        }
      );
    } else {
      this.setState({ focus: false });
    }

    this.textInput.current.blur();
  };

  render() {
    return (
      <div
        className={classNames("adjust-servings", {
          "adjust-servings--active": this.state.focus
        })}
        onClick={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <span className="adjust-servings__text">Yield</span>

        <input
          className={classNames("adjust-servings__input", {
            "adjust-servings__input--active": this.state.focus
          })}
          ref={this.textInput}
          value={this.state.input}
          pattern="[0-9]*"
          type="text"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  convertedServings: state.recipe.convertedServings,
  originalServings: state.recipe.recipe.servings
});

export default connect(
  mapStateToProps,
  { convertServings }
)(Servings);
