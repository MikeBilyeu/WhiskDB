import axios from "axios";
import jwt_decode from "jwt-decode";
import imageUpload from "../../image";
import setAuthToken from "../../../utils/setAuthToken";
import { setCurrentUser } from "../../auth";

const editProfile = (userData, history) => dispatch => {
  return new Promise(async (resolve, reject) => {
    let profileData = { ...userData };

    if (userData.imageFile) {
      let imageURL = await dispatch(imageUpload(userData.imageFile));
      if (!imageURL) {
        reject("Image upload error");
        return;
      }
      profileData = { ...userData, image_url: imageURL };
    }

    const res = await axios.put("/users/edit", profileData);
    if (res.status !== 200) {
      reject("Profile edit error");
      return;
    }
    const token = res.data.token;
    localStorage.setItem("jwtToken", token);
    // Add token to auth header for future requests
    setAuthToken(token);
    const decodedToken = jwt_decode(token);
    dispatch(setCurrentUser(decodedToken));
    history.push(`/profile`);
    resolve();
  });
};

export default editProfile;
