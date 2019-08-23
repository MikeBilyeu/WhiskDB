import axios from "axios";
export const asyncValidate = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    const { username } = values;
    axios.get("/usernames", { params: { username } }).then(res => {
      if (res.status !== 200) {
        reject({ username: "This username is already taken" });
      }
      resolve();
    });
  });
};
