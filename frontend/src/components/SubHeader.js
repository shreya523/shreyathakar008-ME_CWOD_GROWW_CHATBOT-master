import React from "react";
import { Link } from "react-router-dom";
import "./../css/SubHeader.css";

const SubHeader = () => {
  return (
    <div>
      <nav>
        <ul className="subHeader">
          <li>
            <Link to="/stocks" className="navItem">
              Stock
            </Link>
          </li>
          <li>
            <Link to="/mutualfunds" className="navItem">
              Mutual Funds
            </Link>
          </li>
          <li>
            <Link to="/fds" className="navItem">
              Fixed Deposits
            </Link>
          </li>
          <li>
            <Link to="/golds" className="navItem">
              Golds
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SubHeader;
