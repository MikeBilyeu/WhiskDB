import React from "react";

import { ReactComponent as Star } from "./star.svg";

import "./rating-styles.css";

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starColor: ["#FFBA00", "#FFBA00", "#FFBA00", "#FFBA00", "#FFBA00"]
    };
  }

  setStarColors = () => {
    this.setState(({ starColor }, { rating }) => {
      let colors = [];
      for (let i = 0; i < 5; i++) {
        colors = [...colors, rating > i ? "#FFBA00" : "#E2E2E2"];
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
      return <Star key={"star" + i} style={{ width: "1.1rem", fill: color }} />;
    });
  };

  render() {
    const { votes } = this.props;
    return (
      <div className="rating">
        <div className="stars">{this.renderRating()}</div>
        <div className="votes">{`(${
          votes > 1000 ? parseFloat((votes / 1000).toFixed(1)) + "k" : votes
        })`}</div>
      </div>
    );
  }
}

export default Rating;
