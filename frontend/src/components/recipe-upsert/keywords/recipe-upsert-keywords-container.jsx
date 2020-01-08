import React, { Component } from "react";
import Input from "../../form-inputs/input";
import Button from "../../button";
import { ReactComponent as Remove } from "../../../assets/images/removeDark.svg";
import styles from "../recipe-upsert.module.scss";

class Keywords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      error: null
    };
  }

  handleClick = (e, keyword) => {
    e.preventDefault();
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
        <Input
          label="Tags"
          input={{
            value: this.state.keyword,
            onChange: this.handleChange,
            onKeyDown: this.handleKeyDown
          }}
          placeholder="Tags (e.g., baked, crunchy, healthy)"
          meta={{ error: this.state.error, touched: true }}
        />

        <ul className={styles.list}>
          {this.props.keywords &&
            this.props.keywords.map((keyword, index, arr) => {
              return (
                <li key={"keywords " + index}>
                  <Button
                    className={styles.removeBtn}
                    onClick={e => this.handleClick(e, keyword)}
                  >
                    <Remove style={{ width: ".7rem", marginRight: ".5rem" }} />
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
