import "./../../css/FAQ.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";

function FAQ(props) {
  const currentLoc = window.location.pathname;
  const [FAQ, setFAQ] = useState([]);
  const token = useSelector((state) => state.users.token);
  const userId = useSelector((state) => state.users.userId);
  const kycStatus = useSelector((state) => state.users.kycStatus);
  const [param, setParam] = useState({});
  var urlParams = {};
  var optionsMarkup;

  useEffect(() => {
    async function fetchFAQs() {
      var context = currentLoc.split("/");
      try {
        if (
          (context.includes("stocks") ||
            context.includes("mutualfunds") ||
            context.includes("fds") ||
            context.includes("golds")) &&
          context.length === 3
        ) {
          setParam({ token, productId: context[2], userId });
          await axios
            .get(
              `${process.env.REACT_APP_BACKEND_URL}/chatbot/get-product-specific-FAQs`
            )
            .then((res) => {
              setFAQ(res.data.FAQQuestionAnswer);
              return res.data;
            });
        } else if (context.includes("stocks")) {
          await axios
            .get(
              `${process.env.REACT_APP_BACKEND_URL}/chatbot/get-productPage-FAQs/stocks`
            )
            .then((res) => {
              setFAQ(res.data.FAQQuestionAnswer);
              return res.data;
            });
        } else if (context.includes("mutualfunds")) {
          await axios
            .get(
              `${process.env.REACT_APP_BACKEND_URL}/chatbot/get-productPage-FAQs/mutualfunds`
            )
            .then((res) => {
              setFAQ(res.data.FAQQuestionAnswer);
              return res.data;
            });
        } else if (context.includes("fds")) {
          await axios
            .get(
              `${process.env.REACT_APP_BACKEND_URL}/chatbot/get-productPage-FAQs/fds`
            )
            .then((res) => {
              setFAQ(res.data.FAQQuestionAnswer);
              return res.data;
            });
        } else if (context.includes("golds")) {
          await axios
            .get(
              `${process.env.REACT_APP_BACKEND_URL}/chatbot/get-productPage-FAQs/golds`
            )
            .then((res) => {
              setFAQ(res.data.FAQQuestionAnswer);
              return res.data;
            });
        } else if (context.includes("orders") && context.length === 4) {
          setParam({ token, orderId: context[3] });
          urlParams.orderId = context[3];
          await axios
            .get(
              `${process.env.REACT_APP_BACKEND_URL}/chatbot/get-order-FAQs-by-status`,
              {
                params: urlParams,
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((res) => {
              setFAQ(res?.data?.FAQQuestionAnswer);
              return res?.data;
            });
        } else if (context.includes("orders")) {
          setParam({ token, userId });
          await axios
            .get(
              `${process.env.REACT_APP_BACKEND_URL}/chatbot/get-orderPage-FAQs`
            )
            .then((res) => {
              setFAQ(res.data.FAQQuestionAnswer);
              return res.data;
            });
        } else {
          setParam({ token, userId });
          if (userId === "") {
            await axios
              .get(
                `${process.env.REACT_APP_BACKEND_URL}/chatbot/get-user-FAQs/not-logged-in`
              )
              .then((res) => {
                setFAQ(res.data.FAQQuestionAnswer);
                return res.data;
              });
          } else {
            urlParams.kycStatus = kycStatus;
            await axios
              .get(
                `${process.env.REACT_APP_BACKEND_URL}/chatbot/get-user-FAQs/logged-in`,
                {
                  params: urlParams,
                  headers: { Authorization: `Bearer ${token}` },
                }
              )
              .then((res) => {
                setFAQ([]);
                for (let i of res.data) {
                  setFAQ((pre) => [...pre, ...i.FAQQuestionAnswer]);
                }
                return res.data;
              });
          }
        }
      } catch (err) {}
    }
    fetchFAQs();
  }, []);

  if (FAQ !== undefined && FAQ.length > 0) {
    optionsMarkup = FAQ?.map((option) => (
      <button
        className="learning-option-button"
        key={option._id}
        onClick={() =>
          props.actionProvider.populateAnswerHandler(option, param)
        }
      >
        {option.FAQQuestion}
      </button>
    ));
  }

  return <div className="learning-options-container">{optionsMarkup}</div>;
}

const mapStateToProps = (store) => {
  return { user: store.users };
};
export default connect(mapStateToProps)(FAQ);
// export default FAQ
