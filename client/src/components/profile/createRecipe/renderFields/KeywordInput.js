import React from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";

const keywordRegEx = /.{3,25}/;

class KeywordInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keywordValue: "",
      error: null
    };
  }

  handleChange = e => {
    if (keywordRegEx.test(e.target.value)) {
      this.setState({ error: null });
    }
    this.setState({ keywordValue: e.target.value });
  };

  handleAddClick = () => {
    if (this.props.keywords.length >= 10) {
      this.setState({
        error: "Only 1 - 10 keywords allowed"
      });
    } else if (!keywordRegEx.test(this.state.keywordValue)) {
      this.setState({
        error: "Keyword is not valid: must be 3 - 25 characters"
      });
    } else {
      this.props.change(
        `keywords[${this.props.keywords.length}]`,
        this.state.keywordValue
      );

      this.setState((state, props) => {
        return { keywordValue: "" };
      });
      //else display warning
    }
  };

  handleKeyDown = e => {
    if (e.key == "Enter") {
      if (this.props.keywords.length >= 10) {
        this.setState({
          error: "Only 1 - 10 keywords allowed"
        });
      } else if (!keywordRegEx.test(this.state.keywordValue)) {
        this.setState({
          error: "Keyword is not valid: must be 3 - 25 characters"
        });
      } else {
        this.props.change(
          `keywords[${this.props.keywords.length}]`,
          this.state.keywordValue
        );
        this.setState((state, props) => {
          return { keywordValue: "" };
        });
      }
    }
  };

  render() {
    return (
      <div>
        <label htmlFor="keywordInput">Keyword</label>
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 2.5rem",
            placeItems: "center",
            gridGap: ".2rem"
          }}
        >
          <input
            id="keywordInput"
            style={{
              width: "100%",
              borderRadius: "5rem",
              fontSize: "1rem",
              border: "solid #BFBFBF .08rem",
              padding: ".5rem .8rem"
            }}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            value={this.state.keywordValue}
            placeholder="e.g. seafood"
          />
          <div
            style={{
              color: "#0172C4",
              border: "solid #BFBFBF .08rem",
              borderRadius: "100%",
              width: "2.5rem",
              height: "2.5rem",
              lineHeight: "2.5rem",
              textAlign: "center",
              cursor: "pointer"
            }}
            type="button"
            onClick={this.handleAddClick}
          >
            +
          </div>
        </div>

        <div style={{ marginLeft: ".8rem", fontSize: ".8rem" }}>
          Enter 1 - 10 keywords
        </div>

        {this.state.error ? (
          <span className="error">{this.state.error}</span>
        ) : null}
      </div>
    );
  }
}

const selector = formValueSelector("newRecipe");

const mapSateToProps = state => {
  return {
    keywords: selector(state, "keywords")
  };
};

export default connect(mapSateToProps)(KeywordInput);
