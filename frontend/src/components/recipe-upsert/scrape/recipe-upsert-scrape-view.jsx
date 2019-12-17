import React from "react";
import { connect } from "react-redux";
import Button from "../../button";
import { scrapeSite } from "../../../actions/recipeActions";
import styles from "../recipe-upsert.module.scss";

class ScrapeUrl extends React.Component {
  componentDidMount() {
    //check for url in clipboard
  }

  handleClick = async e => {
    e.preventDefault();
    const URL = await navigator.clipboard.readText();
    this.props.scrapeSite(URL);
  };
  render() {
    return (
      <div className={styles.scrapeContainer}>
        <Button onClick={this.handleClick} className={styles.scrapebtn}>
          Clone Recipe
        </Button>
      </div>
    );
  }
}
export default connect(
  null,
  { scrapeSite }
)(ScrapeUrl);
