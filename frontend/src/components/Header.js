import React from "react";
import logoURl from "./../assets/groww-logo.png";
import "./../css/Header.css";
import { NavLink, Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header>
      <div>
        <div>
          <Link to="/home">
            <img src={logoURl} className="App-logo" alt="logo" />
          </Link>
          <nav>
            <NavLink to="/stocks" className="navlink">
              Explore
            </NavLink>
          </nav>
        </div>
        <div>
          <NavLink to="/user/orders" className="navlink">
            <svg
              className="orderIcon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </NavLink>
          {props.user !== "guest" && (
            <NavLink to="/user/profile" className="navlink">
              <svg
                className="orderIcon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M3,21 h18 C 21,12 3,12 3,21" />
              </svg>
            </NavLink>
          )}

          {props.user !== "guest" && (
            <NavLink className="sideLabel side" to="/user/logout">
              <button className="login-logout-action">Logout</button>
            </NavLink>
          )}
          {props.user === "guest" && (
            <NavLink to="/user/login" className="brand">
              <button className="login-logout-action">Login</button>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
