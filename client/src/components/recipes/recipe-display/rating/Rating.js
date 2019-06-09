import React from "react";

import { ReactComponent as Star } from "./star.svg";

import "../rating-styles.css";

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starColor: ["#FFBB5F", "#FFBB5F", "#FFBB5F", "#FFBB5F", "#FFBB5F"]
    };
  }

  setStarColors = () => {
    this.setState(({ starColor }, { rating }) => {
      let colors = [];
      for (let i = 0; i < 5; i++) {
        colors = [...colors, rating > i ? "#FFBB5F" : "#E2E2E2"];
      }
      return {
        starColor: colors
      };
    });
  };

  componentDidMount() {
    this.setStarColors();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rating !== this.props.rating) {
      this.setStarColors();
    }
  }

  renderRating = () => {
    return this.state.starColor.map((color, i) => {
      return <Star key={"star" + i} style={{ width: "1.3rem", fill: color }} />;
    });
  };

  render() {
    const { votes, classStyes = "" } = this.props;
    return (
      <div className="rating">
        <div>{this.renderRating()}</div>
        <div>{`${votes} vote${votes !== 1 ? "s" : ""}`}</div>
      </div>
    );
  }
}

export default Rating;
