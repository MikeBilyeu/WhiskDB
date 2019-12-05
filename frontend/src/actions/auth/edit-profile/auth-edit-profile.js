import axios from "axios";
import jwt_decode from "jwt-decode";
import { SubmissionError } from "redux-form";
import setAuthToken from "../../../utils/setAuthToken";
import { setCurrentUser } from "../../auth";

const editProfile = (userData, history) => async dispatch => {
  try {
    const res = await axios.post("/edit-profile", userData);
    const token = res.data.token;
    localStorage.setItem("jwtToken", token);
    // Add token to auth header for future requests
    setAuthToken(token);
    const decodedToken = jwt_decode(token);
    dispatch(setCurrentUser(decodedToken));
    history.push(`/profile/`);
  } catch (err) {
    console.error(err);
    throw new SubmissionError(err);
  }
};

export default editProfile;
