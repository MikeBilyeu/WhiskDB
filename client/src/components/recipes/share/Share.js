import React from "react";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toggleShare } from "../../../actions/recipeActions";
import { Link } from "react-router-dom";

import "./share-styles.css";

import { ReactComponent as Close } from "../../../images/removeDark.svg";

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
          <Link
            onClick={this.props.toggleShare}
            to={`/profile/edit-recipe/${this.props.recipe_id}`}
            style={{
              display: "inline-block",
              borderTop: "solid #E3E3E3 .05rem",
              padding: "1rem 2rem",
              width: "50%",
              textAlign: "center",
              color: "#0172C4",
              fontSize: ".9rem"
            }}
          >
            Edit Recipe
          </Link>
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
  { toggleShare }
)(Share);
