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
    const { author, toggleShowMore, toggleEditRecipe, className } = this.props;
    return (
      <div className={className}>
        <Close className={`${className}__close-btn`} onClick={toggleShowMore} />
        {author ? (
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
  author: state.recipe.recipe.author
});

export default connect(
  mapStateToProps,
  { toggleShowMore, toggleEditRecipe }
)(More);
