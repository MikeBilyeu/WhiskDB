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
      <div className="filter-box">
        <SortOption sort="Date Saved" option="Date Saved" />
        <SortOption sort="Top Rated" option="Top Rated" />
        <SortOption sort="A-Z" option="A-Z" />
        <SortOption sort="Time" option="Time" />
      </div>
    );
  }
}
export default SortBy;
