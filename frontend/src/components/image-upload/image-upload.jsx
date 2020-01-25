import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { change } from "redux-form";

import "./image-upload.scss";

class ImageUpload extends React.Component {
  onImgChange = e => {
    const file = e.target.files[0];

    if (file) {
      // prevent memory issues
      URL.revokeObjectURL(this.props.input.value);

      const imageURL = URL.createObjectURL(file);

      let data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "recipes");
      this.props.change(this.props.meta.form, "imageFile", data);

      this.props.input.onChange(imageURL);
    }
  };
  render() {
    return (
      <label className={this.props.className}>
        <span>{this.props.input.value ? "Change Image" : "Choose Image"}</span>
        <img src={this.props.input.value} alt="" />
        <input
          type="file"
          accept="image/.jpg;.png;.jpeg;capture=camera"
          onChange={this.onImgChange}
          style={{ display: "none" }}
        />
      </label>
    );
  }
}

ImageUpload.propTypes = {
  className: PropTypes.string.isRequired
};

export default connect(
  null,
  { change }
)(ImageUpload);
