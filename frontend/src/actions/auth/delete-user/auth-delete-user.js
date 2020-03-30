import axios from "axios";
import logoutUser from "../logout-user";
import { GET_ERRORS } from "../../types";

const deleteUser = () => async dispatch => {
  try {
    await axios.delete("/users/delete");
    dispatch(logoutUser());
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export default deleteUser;
