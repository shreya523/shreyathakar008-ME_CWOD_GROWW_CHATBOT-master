import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../app/reducers/authReducer";
import { Link } from "react-router-dom";

function Logout(props) {
  console.log(props.history);
  const dispatch = useDispatch();
  useEffect(() => {
    async function loggingOut() {
      dispatch(logout());
      // props.history.push("/login");
    }
    loggingOut();
  });

  setTimeout(() => {
    console.log("Redirecting to stocks from logout");
    <Link to="/stocks"></Link>;
  }, 2000);

  return (
    <div className="container web-align wrapper">
      <h3>Logged out!</h3>
    </div>
  );
}

export default Logout;
