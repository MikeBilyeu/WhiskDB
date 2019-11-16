import React from "react";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toggleShare, toggleEditRecipe } from "../../../actions/recipeActions";
import { ReactComponent as Close } from "../../../assets/images/removeDark.svg";
import "./share.scss";

class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }
  render() {
    return (
      <div className="share">
        <Close
          style={{
            width: "2rem",
            padding: ".5rem",
            cursor: "pointer",
            justifySelf: "start"
          }}
          onClick={this.props.toggleShare}
        />
        {this.state.copied ? (
          <div
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              color: "#313131"
            }}
          >
            Link copied!
          </div>
        ) : (
          <CopyToClipboard
            text={window.location.href}
            onCopy={() => {
              this.setState({ copied: true });
            }}
          >
            <div className="share-option">Copy Link</div>
          </CopyToClipboard>
        )}

        <div
          className="print-option"
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
            style={{
              display: "inline-block",
              borderTop: "solid #E3E3E3 .05rem",
              padding: "1rem 2rem",
              width: "50%",
              textAlign: "center",
              color: "#0172C4",
              fontSize: ".9rem",
              cursor: "pointer"
            }}
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
)(Share);
