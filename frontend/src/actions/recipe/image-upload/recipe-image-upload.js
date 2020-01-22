//cloudinary image Upload
export const imageUpload = formData => async dispatch => {
  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/mikebilyeuimg/image/upload";

  try {
    let res = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
    res = await res.json();
    return res.secure_url;
  } catch (err) {
    console.error(err);
  }
};

export default imageUpload;
