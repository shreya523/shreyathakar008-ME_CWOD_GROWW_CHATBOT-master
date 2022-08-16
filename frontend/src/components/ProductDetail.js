import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./../css/ProductDetail.css";
import growthGraph from "../assets/Graph.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const userId = useSelector((state) => state.users.userId);
  const [placeOrder, setPlaceOrder] = useState(false);
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const item = await axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/getProductsById/${params.productId}`
        )
        .then((res) => {
          return res.data;
        });
      setProduct(item);
    }
    fetchData();
  }, []);

  return (
    <div>
      {product.map((item) => (
        <div className="container web-align wrapper" key={item._id}>
          {item.productCategory !== "FDs" && (
            <div className="specific-card" key={item._id}>
              <div className="card-top">
                <div>
                  {
                    <img
                      src={item.productUrl}
                      alt={item.productName}
                      width="48px"
                      height="48px"
                    />
                  }
                  <div className="item-name">{item.productName}</div>
                </div>
                <div className="item-details">
                  {item.productCategory === "Stocks" && (
                    <div className="item-price">
                      ₹{item.productPrice.stockPrice.bse}
                    </div>
                  )}
                  {item.productCategory === "Mutual Funds" && (
                    <div className="price-change">
                      {item.productPrice.fundReturns.threeYear} (3Y)
                    </div>
                  )}
                  {item.productCategory === "Stocks" && (
                    <div className="price-change">5.90(1.2%)</div>
                  )}
                  {item.productCategory === "Gold" && (
                    <div className="item-price">{item.productPrice.purity}</div>
                  )}
                </div>
              </div>
              <img src={growthGraph} alt="Graph" width="600px" height="400px" />
              {userId !== "" && !placeOrder && (
                <button
                  onClick={() => {
                    setPlaceOrder(true);
                  }}
                  className="btn btn-primary"
                >
                  Place Order
                </button>
              )}
              {userId !== "" && placeOrder && (
                <div>
                  <button className="btn btn-primary">Confirm</button>
                  <button className="btn btn-primary">Don't Confirm</button>
                </div>
              )}
            </div>
          )}
          {item.productCategory === "FDs" && (
            <div className="specific-card" key={item._id}>
              <div className="card-top">
                <div>
                  <img
                    src={item.productUrl}
                    alt="Product"
                    width="36"
                    height="36"
                  />
                  <div className="item-name">
                    Equitas{" "}
                    {item.productName
                      .split(" ")
                      .slice(1)
                      .join(" ")}
                  </div>
                </div>
                <div className="item-price">
                  {item.productPrice.fd.rateOfInterest}
                </div>
              </div>
              <img src={growthGraph} alt="Graph" width="600px" height="400px" />
              {userId !== "" && !placeOrder && (
                <button className="btn btn-primary">Place Order</button>
              )}
              {userId !== "" && placeOrder && (
                <div>
                  <button className="btn btn-primary">Confirm</button>
                  <button className="btn btn-primary">Don't Confirm</button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;
