import React from "react";
import classNames from "classnames";
import { ReactComponent as Star } from "../../../assets/images/star.svg";
import { ReactComponent as OpenArrow } from "../../../assets/images/arrowLeft.svg";
import "./recipe-rating.scss";

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starColor: ["#FFA805", "#FFA805", "#FFA805", "#FFA805", "##FFA805"]
    };
  }

  setStarColors = () => {
    this.setState(({ starColor }, { rating }) => {
      let colors = [];
      for (let i = 0; i < 5; i++) {
        colors = [...colors, Math.round(rating) > i ? "#FFA805" : "#E2E2E2"];
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
      return (
        <Star
          className="star"
          skey={"star" + i}
          style={{ width: "1.1rem", fill: color }}
        />
      );
    });
  };

  render() {
    const { votes, className, onClick } = this.props;
    return (
      <div className={classNames(`${className}-rating`)} onClick={onClick}>
        <div className={`${className}-rating__stars`}>
          {this.renderRating()}
        </div>
        <div className={`${className}-rating__votes`}>
          {votes > 1000
            ? `${parseFloat((votes / 1000).toFixed(1))}k`
            : votes < 1
            ? ""
            : `${votes}`}
        </div>
        <OpenArrow className={`${className}-rating__arrow`} />
      </div>
    );
  }
}

export default Rating;
