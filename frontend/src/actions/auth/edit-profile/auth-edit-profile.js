import axios from "axios";
import { SubmissionError } from "redux-form";
import setAuthToken from "../../../utils/setAuthToken";
import { setCurrentUser } from "../../auth";
import getUser from "../get-user";

const editProfile = (userData, history) => async dispatch => {
  try {
    const res = await axios.post("/edit-profile", userData);
    const token = res.data.token;
    localStorage.setItem("jwtToken", token);
    // Add token to auth header for future requests
    setAuthToken(token);
    dispatch(setCurrentUser(token));
    dispatch(getUser());
    history.push(`/profile/`);
  } catch (err) {
    throw new SubmissionError(err.response.data);
  }
};

export default editProfile;
