import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "./header";
import RecipeUpsert from "../../recipe-upsert";
import { createRecipe } from "../../../actions/recipeActions";
import axios from "axios";

class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_url: ""
    };
  }
  componentDidMount() {
    (async () => {
      const res = await axios.get(
        "https://source.unsplash.com/collection/251966/500x500"
      );

      this.setState({ image_url: res.request.responseURL });
    })();
  }

  handleSubmit = values => {
    this.props.createRecipe(values, this.props.history);
  };

  handleBackClick = () => {
    this.props.history.goBack();
  };

  render() {
    const initialValues = {
      image_url: this.state.image_url,
      categories: [],
      keywords: []
    };
    if (initialValues.image_url === "") {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Header onClick={this.handleBackClick} />
        <RecipeUpsert
          initialValues={initialValues}
          destroyOnUnmount={false}
          submitText="Save Recipe"
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { createRecipe }
  )(CreateRecipe)
);
