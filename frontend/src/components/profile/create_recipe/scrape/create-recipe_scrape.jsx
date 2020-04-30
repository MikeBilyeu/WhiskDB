import React, { useState } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { scrapeSite } from "../../../../actions/recipe";
import Input from "../../../form_inputs/input";
import Loading from "../../../loading";

const ScrapeUrl = props => {
  const [url, setUrl] = useState("");

  const handleFocus = async () => {
    if (!url && navigator.clipboard) {
      const clipboard = await navigator.clipboard.readText();
      if (/^https:\/\//i.test(clipboard)) {
        setUrl(clipboard);
      }
    }
  };

  const handleScrape = async e => {
    e.preventDefault();
    if (/^https:\/\//i.test(url)) {
      props.scrapeSite(url);
    }
  };

  const handleChange = e => {
    setUrl(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleScrape(e);
    }
  };

  const className = classNames("clone", {
    "clone--fetching": props.cloneRecipe.fetching,
    "clone--success": props.cloneRecipe.success,
    "clone--failure": !props.cloneRecipe.success
  });

  return (
    <Input
      className={className}
      label="Import Recipe"
      placeholder="Enter URL of recipe to import"
      meta
      input={{
        className: "clone__input",
        value: url,
        onFocus: handleFocus,
        onBlur: handleScrape,
        onChange: handleChange,
        onKeyDown: handleKeyDown
      }}
    >
      {props.cloneRecipe.fetching && <Loading />}
    </Input>
  );
};

const mapStateToProps = state => ({
  cloneRecipe: state.cloneRecipe
});
export default connect(
  mapStateToProps,
  { scrapeSite }
)(ScrapeUrl);
