import React, { Component } from "react";
import Input from "../../../form-inputs/input";
import Button from "../../../button";
import styles from "../create-recipe.module.scss";

class Keywords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      error: null
    };
  }

  handleClick = keyword => {
    // Remove from redux state
    this.props.change(
      "keywords",
      this.props.keywords.filter(el => el !== keyword)
    );
  };

  handleChange = e => {
    this.setState({ keyword: e.target.value, error: null });
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      if (!this.validKeywordRegEx.test(this.state.keyword)) {
        this.setState({
          error: "Keyword is not valid: must be 3 - 25 characters"
        });
      } else {
        // Add to redux state
        this.props.change("keywords", [
          ...this.props.keywords,
          this.state.keyword
        ]);
        this.setState({ keyword: "" });
      }
    }
  };

  validKeywordRegEx = /^.{3,25}$/;

  render() {
    return (
      <div className={styles.keywordsContainer}>
        <h2>Keywords</h2>
        <Input
          label="Keyword"
          input={{
            value: this.state.keyword,
            onChange: this.handleChange,
            onKeyDown: this.handleKeyDown
          }}
          placeholder="Simple"
          meta={{ error: this.state.error, touched: true }}
        />
        {this.props.keywords && this.props.keywords.length ? (
          <label>Remove Keywords</label>
        ) : null}

        <ul className={styles.list}>
          {this.props.keywords &&
            this.props.keywords.map((keyword, index, arr) => {
              return (
                <li key={"keywords " + index}>
                  <Button
                    className={styles.removeBtn}
                    onClick={() => this.handleClick(keyword)}
                  >
                    {keyword}
                  </Button>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default Keywords;
