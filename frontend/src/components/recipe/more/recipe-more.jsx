import React from "react";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toggleShowMore, toggleEditRecipe } from "../../../actions/recipe";
import { toggleReview } from "../../../actions/review";
import { ReactComponent as Close } from "../../../assets/images/removeDark.svg";
import "./recipe-more.scss";

class More extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }
  render() {
    const {
      created_by,
      user_id,
      toggleShowMore,
      toggleEditRecipe,
      toggleReview,
      className
    } = this.props;
    return (
      <div className={className}>
        <Close className={`${className}__close-btn`} onClick={toggleShowMore} />
        {user_id === created_by ? (
          <div
            onClick={() => {
              toggleEditRecipe();
              toggleShowMore();
            }}
            className={`${className}__edit-btn`}
          >
            Edit
          </div>
        ) : null}
        {this.state.copied ? (
          <h1 className={`${className}__copy-msg`}>Link copied!</h1>
        ) : (
          <CopyToClipboard
            text={window.location.href}
            onCopy={() => {
              this.setState({ copied: true });
            }}
          >
            <div className={`${className}__copy-btn`}>Share</div>
          </CopyToClipboard>
        )}

        <div
          className={`${className}__print-btn`}
          onClick={() => {
            window.print();
          }}
        >
          Print
        </div>
        <div
          className={`${className}__print-btn`}
          onClick={() => {
            toggleReview();
          }}
        >
          Review
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  created_by: state.recipe.recipe.created_by,
  user_id: state.auth.user.user_id,
  recipe_id: state.recipe.recipe.recipe_id
});

export default connect(
  mapStateToProps,
  { toggleShowMore, toggleEditRecipe, toggleReview }
)(More);
