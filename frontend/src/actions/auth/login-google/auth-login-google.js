import axios from "axios";
import { GET_ERRORS } from "../../types";

const googleLogin = () => async dispatch => {
  try {
    const result = await axios.get("/auth/google");
    const URL = result.request.responseURL;
    window.open(URL, "_self");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export default googleLogin;
