import axios from "axios";
import { GET_ERRORS } from "../../types";
import loginUser from "../login-user";

const registerUser = userData => async dispatch => {
  try {
    await axios.post("/api/users/user", userData);
    dispatch(
      loginUser({
        email: userData.email,
        password: userData.password
      })
    );
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export default registerUser;
