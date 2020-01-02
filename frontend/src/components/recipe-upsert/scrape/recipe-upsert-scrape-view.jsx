import React from "react";
import { connect } from "react-redux";
import Button from "../../button";
import { scrapeSite } from "../../../actions/recipeActions";
import styles from "../recipe-upsert.module.scss";

class ScrapeUrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { URL: null };
  }
  componentDidMount() {
    //check for url in clipboard
  }

  handleClick = async e => {
    e.preventDefault();
    const URL = await navigator.clipboard.readText();
    this.setState({ URL: URL });
    this.props.scrapeSite(this.state.URL);
  };
  render() {
    return (
      <div className={styles.scrapeContainer}>
        <Button onClick={this.handleClick} className={styles.scrapebtn}>
          Clone Recipe
          <div className={styles.URL}>{this.state.URL}</div>
        </Button>
      </div>
    );
  }
}
export default connect(
  null,
  { scrapeSite }
)(ScrapeUrl);
