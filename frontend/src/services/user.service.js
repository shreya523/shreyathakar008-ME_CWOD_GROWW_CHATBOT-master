import axios from "axios";
axios.defaults.withCredentials = true;

async function login(email, password) {
  const response = await axios
    .post(
      `${process.env.REACT_APP_BACKEND_URL}/user/login`,
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    )
    .then(
      (response) => {
        return response;
      },
      (error) => {
        return error;
      }
    );

  return response;
}

async function signup(name, email, password, confirmPassword) {
  const response = await axios
    .post(
      `${process.env.REACT_APP_BACKEND_URL}/user/signup`,
      {
        name: name,
        email: email,
        password: password,
        passwordConfirmation: confirmPassword,
      },
      { withCredentials: true }
    )
    .then(
      (response) => {
        return response;
      },
      (error) => {
        return error;
      }
    );

  return response;
}

export const userService = {
  login,
  signup,
};
