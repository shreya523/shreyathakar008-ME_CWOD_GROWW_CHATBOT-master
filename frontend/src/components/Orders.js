import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../css/Orders.css";

const Orders = (props) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function fetchData() {
      var urlParams = {};
      urlParams.userId = props.userId;
      if (props.user !== "guest") {
        const item = await axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/user/orders`,
            { userId: props.userId },
            {
              headers: { Authorization: `Bearer ${props.token}` },
            }
          )
          .then(
            (res) => {
              return res.data;
            },
            (err) => {
              console.log(err);
            }
          );
        setItems(item);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container web-align wrapper">
      {props.user === "guest" && <h3>Login to view orders!</h3>}
      {props.user !== "guest" && !items && <h3>No Orders Found!</h3>}
      {props.user !== "guest" && items?.length > 0 && (
        <div className="container">
          {items.map((item) => (
            <Link
              className="order-details"
              to={`/user/orders/${item._id}`}
              key={item._id}
            >
              <div className="order-card" key={item._id}>
                <img
                  className="order-product-image"
                  src={item.productDocs[0].productUrl}
                  alt={item.productDocs[0].productName}
                />
                <p className="order-product-name">
                  {item?.productDocs[0]?.productName}
                </p>
                <p className="order-status">Status: {item?.orderStatus}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
