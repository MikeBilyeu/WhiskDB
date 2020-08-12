import axios from "axios";
import jwt_decode from "jwt-decode";
import { SubmissionError } from "redux-form";
import setAuthToken from "../../../utils/setAuthToken";
import { setCurrentUser } from "../../auth";

const loginUser = userData => async dispatch => {
  try {
    const res = await axios.post("/api/users/login", userData);
    const token = res.data.token;
    localStorage.setItem("jwtToken", token);
    // Add token to auth header for future requests
    setAuthToken(token);
    const decodedToken = jwt_decode(token);
    dispatch(setCurrentUser(decodedToken));
  } catch (err) {
    throw new SubmissionError(err.response.data);
  }
};

export default loginUser;
