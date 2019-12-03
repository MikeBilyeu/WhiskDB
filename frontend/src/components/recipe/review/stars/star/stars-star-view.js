import React from "react";
import { ReactComponent as StarIcon } from "../../../../../assets/images/star.svg";

class Star extends React.Component {
  shouldComponentUpdate(prevProps, prevState) {
    return prevProps.color !== this.props.color;
  }
  render() {
    return (
      <StarIcon
        key={"star" + this.props.index}
        className="star"
        style={{
          fill: this.props.color
        }}
        onMouseEnter={() => this.props.handleMouseEnter(this.props.index + 1)}
        onClick={() => this.props.handleClick(this.props.index)}
      />
    );
  }
}

export default Star;
