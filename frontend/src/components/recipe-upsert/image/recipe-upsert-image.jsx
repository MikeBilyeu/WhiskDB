import React from "react";
import Button from "../../button";
import styles from "../recipe-upsert.module.scss";

class ImageUpload extends React.Component {
  render() {
    return (
      <Button className={styles.imageInputBtn}>Choose Photo to Upload</Button>
    );
  }
}

export default ImageUpload;
