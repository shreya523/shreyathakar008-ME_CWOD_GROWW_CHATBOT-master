import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./../css/OrderDetail.css";

const OrdersDetail = (props) => {
  const params = useParams();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    async function fetchData() {
      var item = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/user/orders/${params.orderId}`,
          {},
          {
            headers: { Authorization: `Bearer ${props.token}` },
          }
        )
        .then((res) => {
          return res.data;
        });
      setOrder(item);
    }
    fetchData();
  }, []);

  return (
    <div>
      {order.map((item) => (
        <div className="container wrapper">
          <div className="justify-content-center">
            <div className="order-detail-card " key={item._id}>
              <div>
                <img
                  src={item.productDocs[0].productUrl}
                  alt="Product"
                  width="36"
                  height="36"
                />
                <span className="order-name">
                  {item.productDocs[0].productName}
                </span>
                <hr />
              </div>
              <div>
                <div>
                  <span className="order-details-lable">Order Date:</span>
                  <span className="order-details-value">{item.orderDate}</span>
                </div>
                <div>
                  <span className="order-details-lable">Units:</span>
                  <span className="order-details-value">{item.units}</span>
                </div>
              </div>
              <hr />

              <div className="order-details">
                <p
                  style={{
                    height: "40px",
                    color: `${
                      item.orderStatus === "Pending"
                        ? "#FFD700"
                        : item.orderStatus === "Cancelled"
                        ? "#808080"
                        : item.orderStatus === "Failed"
                        ? "#B22222"
                        : "green"
                    }`,
                  }}
                >
                  {item.orderStatus}
                </p>
                <div className="status-container">
                  {item.orderStatus === "Pending" && (
                    <button className="order-button">Complete Order</button>
                  )}
                  {item.orderStatus === "Completed" && (
                    <button className="order-button">Repeat Order</button>
                  )}
                  {item.orderStatus === "Pending" && (
                    <button className="order-button">Cancel Order</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersDetail;
