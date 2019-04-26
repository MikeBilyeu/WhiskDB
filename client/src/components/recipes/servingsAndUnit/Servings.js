import React from "react";

import { connect } from "react-redux";

const Serving = props => {
  return <div style={{ cursor: "pointer" }}>{props.servings}</div>;
};

class Servings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          border: "solid red",
          width: "60%",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          placeItems: "center"
        }}
      >
        <Serving servings={this.props.servings / 2} />
        <Serving servings={this.props.servings} />
        <Serving servings={this.props.servings * 2} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ servings: state.recipe.recipe.servings });
export default connect(mapStateToProps)(Servings);
