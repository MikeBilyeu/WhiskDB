import React from "react";
import styles from "../recipe-upsert.module.scss";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgBlob: ""
    };
  }

  onImgChange = e => {
    const file = e.target.files[0];

    if (file) {
      // prevent memory issues
      URL.revokeObjectURL(this.state.imgBlob);

      const imgBlob = URL.createObjectURL(file);
      this.setState({ imgBlob });

      let data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "recipes");
      this.props.input.onChange(data);
    }
  };
  render() {
    return (
      <label className={styles.imageInput}>
        <span>
          {this.state.imgBlob || this.props.input.value
            ? "Change Image"
            : "Upload Image"}
        </span>
        <img src={this.state.imgBlob || this.props.input.value} alt="" />
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

export default ImageUpload;
