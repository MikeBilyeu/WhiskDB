import React from "react";

import { ReactComponent as Star } from "./star.svg";

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = { starColor: [] };
  }
  componentDidMount() {
    for (let i = 0; i < 5; i++) {
      this.setState(({ starColor }, { rating }) => {
        return {
          starColor: [...starColor, rating > i ? "#FFBB5F" : "#E2E2E2"]
        };
      });
    }
  }

  renderRating = () => {
    return this.state.starColor.map((color, i) => {
      return <Star key={"star" + i} style={{ width: "1.3rem", fill: color }} />;
    });
  };

  render() {
    const { votes } = this.props;
    return (
      <div
        style={{
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "7rem 1fr",
          color: "#313131"
        }}
      >
        <div>{this.renderRating()}</div>
        <div>{`${votes} vote${votes !== 1 ? "s" : ""}`}</div>
      </div>
    );
  }
}

export default Rating;
