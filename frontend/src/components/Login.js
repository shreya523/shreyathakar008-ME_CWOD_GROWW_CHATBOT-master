import React, { useState } from "react";
import { userService } from "../services/user.service";
import ReactTypingEffect from "react-typing-effect";
import { login } from "../app/reducers/authReducer";
import "./../css/Login.css";
import { useDispatch } from "react-redux";

const Login = (props) => {
  const [enteredEmailAddress, setEmailAddress] = useState("");
  const [enteredPassword, setPassword] = useState("");
  const [enteredConfirmPassword, setConfirmPassword] = useState("");
  const [enteredName, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setsuccess] = useState(false);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  var user;

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        if (enteredEmailAddress && enteredPassword) {
          userService
            .login(enteredEmailAddress, enteredPassword)
            .then((res) => {
              setLoading(false);
              if (res?.response?.status === 401) {
                setErrMsg("Wrong Email or Password");
              } else if (res?.status === 200) {
                user = {
                  ...res?.data?.user,
                  token: res?.data?.token,
                };
                setsuccess(true);
                setEmailAddress("");
                setPassword("");
              } else {
                setErrMsg("Login Failed");
              }
              dispatch(login(user));
            });
        } else if (!enteredEmailAddress || !enteredPassword) {
          setLoading(false);
          setErrMsg("Missing Email or Password");
        }
      } else {
        if (
          enteredName &&
          enteredEmailAddress &&
          enteredPassword &&
          enteredConfirmPassword
        ) {
          userService
            .signup(
              enteredName,
              enteredEmailAddress,
              enteredPassword,
              enteredConfirmPassword
            )
            .then((res) => {
              setLoading(false);
              if (res?.response?.status === 400) {
                if (res?.response?.data?.errors?.email) {
                  setErrMsg(res?.response?.data?.errors?.email?.message);
                } else if (res?.response?.data?.errors?.passwordConfirmation) {
                  setErrMsg(
                    res?.response?.data?.errors?.passwordConfirmation?.message
                  );
                } else if (
                  res?.response?.data?.code === 11000 &&
                  res?.response?.data?.keyPattern?.email
                ) {
                  setErrMsg(
                    "Account alredy exsist for given email. Please try login."
                  );
                }
              } else if (res?.status === 201) {
                user = {
                  ...res?.data?.data?.user,
                  token: res?.data?.token,
                };
                setsuccess(true);
                setEmailAddress("");
                setPassword("");
              } else {
                setErrMsg("Account not created! Please try again");
              }
              dispatch(login(user));
            });
        } else {
          setLoading(false);
          setErrMsg("Please fill all the required imformation");
        }
      }
    } catch (err) {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container web-align wrapper">
        {props?.user !== "guest" && <h3>You are logged in as {props.user}</h3>}
        {props?.user === "guest" && <h3>You are logged in!</h3>}
        <br />
      </div>
    );
  }

  return (
    <div>
      <div className="container web-align wrapper">
        <div className="row login-container">
          <div className="col-md-6 login-left">
            Simple, Free Investing
            <ReactTypingEffect
              speed={100}
              eraseDelay={100}
              className="typingeffect"
              text={["Stocks", "Mutual Funds", "Fixed Deposits", "Gold"]}
            />
          </div>
          <div className="col-md-6 login-right">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <form name="form" onSubmit={submitHandler}>
              {!isLogin && (
                <div
                  className={"form-group" + (!enteredName ? " has-error" : "")}
                >
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={enteredName}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {!enteredName && (
                    <div className="help-block">*Name is required</div>
                  )}
                </div>
              )}
              <div
                className={
                  "form-group" + (!enteredEmailAddress ? " has-error" : "")
                }
              >
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={enteredEmailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
                {!enteredEmailAddress && (
                  <div className="help-block">*Email is required</div>
                )}
              </div>
              <div
                className={
                  "form-group" + (!enteredPassword ? " has-error" : "")
                }
              >
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={enteredPassword}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!enteredPassword && (
                  <div className="help-block">*Password is required</div>
                )}
              </div>
              {!isLogin && (
                <div
                  className={
                    "form-group" + (!enteredConfirmPassword ? " has-error" : "")
                  }
                >
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={enteredConfirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {!enteredConfirmPassword && (
                    <div className="help-block">
                      *Confirm Password is required
                    </div>
                  )}
                </div>
              )}
              <div className="form-group">
                <button className="btn btn-primary">
                  {isLogin ? "Login" : "Create Account"}
                </button>

                {loading && !success && errMsg === "" && (
                  <div>
                    <h4>
                      {" "}
                      {isLogin ? "Logging in..." : "Creating new account..."}
                    </h4>
                    <img
                      alt="loading"
                      src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                    />
                  </div>
                )}
                {!loading && !success && errMsg !== "" && (
                  <div>
                    <p>{errMsg}</p>
                  </div>
                )}
                <div>
                  <a
                    className="switch"
                    type="button"
                    onClick={switchAuthModeHandler}
                  >
                    {isLogin
                      ? "Create new account"
                      : "Login with existing account"}
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
