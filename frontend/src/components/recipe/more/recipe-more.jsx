import React from "react";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toggleShowMore, toggleEditRecipe } from "../../../actions/recipe";
import { ReactComponent as Close } from "../../../assets/images/removeDark.svg";
import UnitsAdjust from "../units_adjust";
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
          <h1 className={`${className}__copy-msg`}>Link Copied</h1>
        ) : (
          <CopyToClipboard
            text={window.location.href}
            onCopy={() => {
              this.setState({ copied: true });
            }}
          >
            <div className={`${className}__copy-btn`}>Copy Link</div>
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

        <UnitsAdjust className={`${className}__unit-btn`} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  created_by: state.recipe.recipe.created_by,
  user_id: state.auth.user.user_id
});

export default connect(
  mapStateToProps,
  { toggleShowMore, toggleEditRecipe }
)(More);
