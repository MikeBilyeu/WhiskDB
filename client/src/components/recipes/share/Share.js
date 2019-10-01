import React from "react";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toggleShare } from "../../../actions/recipeActions";

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
            cursor: "pointer"
          }}
          onClick={this.props.toggleShare}
        />
        {this.state.copied ? (
          <div
            style={{
              textAlign: "center",
              fontSize: "1.8rem",
              color: "#313131",
              margin: "2rem 0"
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
      </div>
    );
  }
}

export default connect(
  null,
  { toggleShare }
)(Share);
