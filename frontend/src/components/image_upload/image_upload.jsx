import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { change } from "redux-form";

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
    const { className } = this.props;
    return (
      <label className={className}>
        <span className={`${className}__text`}>
          {this.props.input.value ? "Change Image" : "Choose Image to Upload"}
        </span>
        <img
          className={`${className}__img`}
          src={this.props.input.value}
          alt=""
          style={{ display: !this.props.input.value ? "none" : "block" }}
        />
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
