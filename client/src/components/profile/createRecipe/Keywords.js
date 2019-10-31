import React, { Component } from "react";

// Compnents
import Input from "../../form-inputs/Input";
import { Button } from "../../Button";
import { ReactComponent as Remove } from "../../../images/removeDark.svg";

class Keywords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      error: null
    };
  }

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
        this.props.fields.push(this.state.keyword);
        this.setState({ keyword: "" });
      }
    }
  };

  validKeywordRegEx = /.{3,25}/;

  render() {
    return (
      <div>
        <h2>Keywords</h2>
        <Input
          label="Keyword"
          input={{
            value: this.state.keyword,
            onChange: this.handleChange,
            onKeyDown: this.handleKeyDown
          }}
          placeholder=""
          meta={{ error: this.state.error, touched: true }}
        />
        <label>Remove Keywords</label>
        <ul>
          {this.props.fields.map((keyword, index, arr) => {
            return (
              <li key={index}>
                <Button onClick={() => this.props.fields.remove(index)}>
                  {this.props.keywords[index]}
                  <Remove style={{ width: ".8rem" }} />
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
