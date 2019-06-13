import React from "react";

import FilterOption from "./FilterOption";

import "./filter-styles.css";

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      xAxis: 0,
      touchStart: 0,
      touchMove: 0,
      startMoveDiff: 0
    };
  }
  renderFilterOptions = () => {
    return this.props.filterOptions.map((option, i) => {
      return (
        <FilterOption
          key={option + i}
          option={option}
          filterType={this.props.filterType}
        />
      );
    });
  };
  handleTouchStart = e => {
    e.persist();
    this.setState({
      touchStart: e.touches[0].clientX,
      touchMove: e.touches[0].clientX
    });
  };

  handleTouchMove = e => {
    e.persist();
    this.setState(prevState => {
      const diff = e.touches[0].clientX - prevState.touchMove;
      return {
        startMoveDiff: e.touches[0].clientX - prevState.touchStart,
        touchMove: e.touches[0].clientX,
        xAxis:
          prevState.xAxis + diff > 0
            ? 0
            : prevState.xAxis + diff < -this.barDiff
            ? -this.barDiff
            : prevState.xAxis + diff
      };
    });
  };
  barWidth = 0;
  outerBarWidth = 0;
  barDiff = 0;
  render() {
    this.barDiff = Math.abs(this.barWidth - this.outerBarWidth);

    return (
      <div
        className="outer-bar"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        ref={el => {
          if (el) {
            this.outerBarWidth = el.offsetWidth;
          }
        }}
      >
        <div
          className="filter-bar"
          style={{
            left: this.state.xAxis
          }}
          ref={el => {
            if (el) {
              this.barWidth = el.offsetWidth;
            }
          }}
        >
          {this.renderFilterOptions()}
        </div>
      </div>
    );
  }
}
export default Filter;
