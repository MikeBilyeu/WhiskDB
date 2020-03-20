import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { convertServings } from "../../../actions/recipeActions";
import "./recipe-servings_adjust.scss";

const ServingsAdjust = props => {
  const [focus, setFocus] = useState(false);
  const [input, setInput] = useState("");
  const textInput = useRef(null);
  const numLimit = /^(?!0)[0-9]{0,2}$/;

  useEffect(() => {
    setInput(props.originalServings);
  }, []);

  useEffect(() => {
    if (input !== "" && numLimit.test(input)) {
      props.convertServings(input);
    } else if (input === "") {
      props.convertServings(props.originalServings);
    }
  }, [input]);

  const handleChange = event => {
    if (numLimit.test(event.target.value)) {
      setInput(event.target.value);
    }
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  const handleFocus = () => {
    if (!focus) {
      textInput.current.focus();
      setFocus(true);
      setInput("");
    }
  };

  const handleBlur = () => {
    if (input === "") {
      setFocus(false);
      setInput(props.originalServings);
    } else {
      setFocus(false);
    }

    textInput.current.blur();
  };

  return (
    <div
      className={classNames("adjust-servings", {
        "adjust-servings--active": focus
      })}
      onClick={handleFocus}
      onBlur={handleBlur}
    >
      <span className="adjust-servings__text">Yield</span>

      <input
        className={classNames("adjust-servings__input", {
          "adjust-servings__input--active": focus
        })}
        ref={textInput}
        value={input}
        pattern="[0-9]*"
        type="text"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  convertedServings: state.recipe.convertedServings,
  originalServings: state.recipe.recipe.servings
});

export default connect(
  mapStateToProps,
  { convertServings }
)(ServingsAdjust);
