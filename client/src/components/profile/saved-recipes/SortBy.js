import React from "react";
import SortOption from "./SortOption";
class SortBy extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sortBy: "date saved" };
  }
  handleClick = sort => {
    this.setState({ sortBy: sort });
  };
  render() {
    return (
      <div style={{ borderTop: "solid #c7c7c7 1px" }} className="filter-box">
        <SortOption sort="date saved" option="Date Saved" />
        <SortOption sort="top rated" option="Top Rated" />
        <SortOption sort="a-z" option="A-Z" />
        <SortOption sort="time" option="Time" />
      </div>
    );
  }
}
export default SortBy;
