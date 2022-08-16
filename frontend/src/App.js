import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import SubHeader from "./components/SubHeader";
import { Route, Switch } from "react-router-dom";
import ChatBot from "./components/Chatbot/ChatBot";
import Orders from "./components/Orders";
import Products from "./components/Products";
import config from "./components/Chatbot/config";
import MessageParser from "./components/Chatbot/MessageParser";
import ActionProvider from "./components/Chatbot/ActionProvider";
import ProductDetail from "./components/ProductDetail";
import { useSelector, connect } from "react-redux";
import Logout from "./components/Logut";
import Profile from "./components/Profile";
import OrdersDetail from "./components/OrdersDetail";

function App(props) {
  const userName = useSelector((state) => state.users.user);
  const userId = useSelector((state) => state.users.userId);
  const token = useSelector((state) => state.users.token);
  const [user, setUser] = useState({ userName, userId });

  useEffect(() => {
    if (props) {
      setUser({ userName: props?.user?.user, userId: props?.user?.userId });
    }
  }, [props.user]);

  return (
    <div className="App">
      <Header user={user.userName}></Header>
      <SubHeader />
      <hr className="hr-line" />
      <Switch>
        <Route exact path="/user/login">
          <Login user={user.userName} />
        </Route>
        <Route exact path="/user/logout">
          <Logout />
        </Route>
        <Route
          path={[
            "/stocks/:productId",
            "/mutualfunds/:productId",
            "/fds/:productId",
            "/golds/:productId",
          ]}
        >
          <ProductDetail />
        </Route>
        <Route exact path="/stocks">
          <Products category={"stocks"} />
        </Route>
        <Route exact path="/fds">
          <Products category={"fds"} />
        </Route>
        <Route exact path="/golds">
          <Products category={"golds"} />
        </Route>
        <Route exact path="/mutualfunds">
          <Products category={"mutualfunds"} />
        </Route>
        <Route exact path="/user/orders">
          <Orders user={user.userName} token={token} />
        </Route>
        <Route path="/user/orders/:orderId">
          <OrdersDetail token={token} />
        </Route>
        <Route exact path="/user/profile">
          <Profile userId={user.userId} token={token} />
        </Route>
      </Switch>
      <ChatBot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

const mapStateToProps = (store) => {
  return { user: store.users };
};

export default connect(mapStateToProps)(App);
