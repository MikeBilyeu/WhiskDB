import React from "react";
import { ReactComponent as StarIcon } from "../../../../../assets/images/star.svg";

class Star extends React.Component {
  shouldComponentUpdate(prevProps, prevState) {
    return prevProps.color !== this.props.color;
  }
  render() {
    return (
      <span
        key={"starIcon" + this.props.index}
        className="star"
        onMouseEnter={() => this.props.handleMouseEnter(this.props.index + 1)}
        onClick={() => this.props.handleClick(this.props.index + 1)}
      >
        <StarIcon
          style={{
            fill: this.props.color
          }}
        />
      </span>
    );
  }
}

export default Star;
