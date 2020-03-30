import axios from "axios";
import jwt_decode from "jwt-decode";
import imageUpload from "../../image";
import { SubmissionError } from "redux-form";
import setAuthToken from "../../../utils/setAuthToken";
import { setCurrentUser } from "../../auth";

const editProfile = (userData, history) => async dispatch => {
  let profileData = { ...userData };

  try {
    if (userData.imageFile) {
      let imageURL = await dispatch(imageUpload(userData.imageFile));
      profileData = { ...userData, image_url: imageURL };
    }

    const res = await axios.put("/users/edit", profileData);
    const token = res.data.token;
    localStorage.setItem("jwtToken", token);
    // Add token to auth header for future requests
    setAuthToken(token);
    const decodedToken = jwt_decode(token);
    dispatch(setCurrentUser(decodedToken));
    history.push(`/profile/`);
  } catch (err) {
    console.error("erroror", err);
    //  throw new SubmissionError(err);
  }
};

export default editProfile;
