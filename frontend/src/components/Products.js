import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../css/Products.css";
import { Link } from "react-router-dom";

const Products = (props) => {
  const [items, setItems] = useState([]);
  const currentLoc = window.location.pathname;

  const reverseMapper = {
    Stocks: "/stocks",
    FDs: "/fds",
    Gold: "/golds",
    "Mutual Funds": "/mutualfunds",
  };

  useEffect(() => {
    async function fetchData() {
      const item = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/${props.category}`)
        .then((res) => {
          return res.data;
        });

      setItems(item);
    }
    fetchData();
  }, [currentLoc]);

  return (
    <div>
      <div className="container">
        {items.map((item) => (
          <Link
            className="product-details"
            to={`${reverseMapper[item.productCategory]}/${item?._id}`}
            key={item?._id}
          >
            <div className="product-card" key={item?._id}>
              <div>
                <img
                  className="product-image"
                  src={item?.productUrl}
                  alt={item?.productName}
                />
                <p className="product-name">{item?.productName}</p>
              </div>
              <div>
                <p className="product-price">
                  {(item.productCategory === "Stocks" ||
                    item.productCategory === "Mutual Funds") &&
                    "₹"}
                  {item.productCategory === "Stocks" &&
                    item?.productPrice?.stockPrice?.bse}
                  {item.productCategory === "Mutual Funds" &&
                    item?.productPrice?.fundReturns?.threeYear}
                  {item.productCategory === "Mutual Funds" && (
                    <span className="mutual-fund-price-scheme"> (3Y)</span>
                  )}
                  {item.productCategory === "FDs" &&
                    item?.productPrice?.fd?.rateOfInterest}
                  {item.productCategory === "FDs" && (
                    <span className="mutual-fund-price-scheme"> (2 Years)</span>
                  )}
                  {item.productCategory === "Gold" &&
                    item?.productPrice?.purity}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
