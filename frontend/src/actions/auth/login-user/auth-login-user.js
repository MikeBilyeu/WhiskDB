import axios from "axios";
import { SubmissionError } from "redux-form";
import setAuthToken from "../../../utils/setAuthToken";
import { setCurrentUser } from "../../auth";

const loginUser = userData => async dispatch => {
  try {
    const res = await axios.post("/login", userData);
    const token = res.data.token;
    localStorage.setItem("jwtToken", token);
    // Add token to auth header for future requests
    setAuthToken(token);
    dispatch(setCurrentUser(token));
  } catch (err) {
    throw new SubmissionError(err.response.data);
  }
};

export default loginUser;
