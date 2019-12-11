import React from "react";
import { connect } from "react-redux";
import Button from "../../button";
import { scrapeSite } from "../../../actions/recipeActions";
import styles from "../recipe-upsert.module.scss";

class ScrapeUrl extends React.Component {
  componentDidMount() {
    //check for url in clipboard
  }

  handleClick = async () => {
    const URL = await navigator.clipboard.readText();
    this.props.scrapeSite(URL);
  };
  render() {
    return (
      <Button onClick={this.handleClick} className={styles.scrapebtn}>
        Paste URL
      </Button>
    );
  }
}
export default connect(
  null,
  { scrapeSite }
)(ScrapeUrl);
