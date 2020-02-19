import React from "react";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toggleShare, toggleEditRecipe } from "../../../actions/recipe";
import { ReactComponent as Close } from "../../../assets/images/removeDark.svg";
import "./more.scss";

class More extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }
  render() {
    return (
      <div className="recipe-more">
        <Close
          className="recipe-more__close-btn"
          onClick={this.props.toggleShare}
        />
        {this.state.copied ? (
          <h1 className="recipe-more__copy-msg">Link copied!</h1>
        ) : (
          <CopyToClipboard
            text={window.location.href}
            onCopy={() => {
              this.setState({ copied: true });
            }}
          >
            <div className="recipe-more__copy-btn">Copy Link</div>
          </CopyToClipboard>
        )}

        <div
          className="recipe-more__print-btn"
          onClick={() => {
            window.print();
          }}
        >
          Print
        </div>

        {this.props.user_id === this.props.created_by ? (
          <div
            onClick={() => {
              this.props.toggleEditRecipe();
              this.props.toggleShare();
            }}
            className="recipe-more__edit-btn"
          >
            Edit Recipe
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    created_by: state.recipe.recipe.created_by,
    user_id: state.auth.user.user_id,
    recipe_id: state.recipe.recipe.recipe_id
  };
};

export default connect(
  mapStateToProps,
  { toggleShare, toggleEditRecipe }
)(More);
