//cloudinary image Upload
export const imageUpload = data => async dispatch => {
  const API_URL = "https://api.cloudinary.com/v1_1/mikebilyeuimg/image/upload";
  try {
    let res = await fetch(API_URL, { method: "POST", body: data });
    res = await res.json();
    return res.secure_url;
  } catch (err) {
    console.error(err);
  }
};

export default imageUpload;
