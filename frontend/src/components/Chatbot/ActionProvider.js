import axios from "axios";

class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }
  greetingsHandler(message) {
    const returnMessage = this.createChatBotMessage(
      "Hello, How can I help you?",
      {
        widget: "FAQ",
      }
    );
    this.updateChatbotState(returnMessage);
  }

  dynamicAnswerHandle = async (FAQ, params) => {
    console.log(params);
    console.log(FAQ);
    if (FAQ.FAQDynamicKey === "isProductInUserOrder") {
      await axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/user/orders//get-order-by-ProductUserId`,
          {
            params,
            headers: { Authorization: `Bearer ${params.token}` },
          }
        )
        .then(
          (res) => {
            console.log(res);
            if (res?.data?.length > 0) {
              FAQ.FAQAnswer = [
                {
                  FAQAnswerText: `You have placed ${res?.data?.length} order before`,
                  FAQAnswerType: "text",
                },
                {
                  FAQAnswerText: `To view the more details click on below link`,
                  FAQAnswerType: "text",
                },
              ];
              for (let i = 0; i < res?.data?.length; i++) {
                FAQ.FAQAnswer.push({
                  FAQAnswerText: `${process.env.REACT_APP_FRONTEND_URL}/user/orders/${res.data[i]._id}`,
                  FAQAnswerType: "link",
                });
              }
            } else {
              FAQ.FAQAnswer = [
                {
                  FAQAnswerText: "No, you have not bought this product before",
                  FAQAnswerType: "text",
                },
                {
                  FAQAnswerText:
                    "To order this product please click on Place Order button",
                  FAQAnswerType: "text",
                },
              ];
            }
            console.log(FAQ.FAQAnswer);
            return FAQ.FAQAnswer;
          },
          (rej) => {
            console.log(rej);
            if (rej?.response?.status === 401) {
              FAQ.FAQAnswer = [
                {
                  FAQAnswerText: "Please login to view this information",
                  FAQAnswerType: "text",
                },
                {
                  FAQAnswerText: `${process.env.REACT_APP_FRONTEND_URL}/user/login`,
                  FAQAnswerType: "link",
                  FAQAnswerLinkText: "Click here to login",
                },
              ];
            }
            return FAQ.FAQAnswer;
          }
        );
    } else if (FAQ.FAQDynamicKey === "showAllOrders") {
      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/user/orders`,
          { userId: params.userId },
          {
            headers: { Authorization: `Bearer ${params.token}` },
          }
        )
        .then(
          (res) => {
            console.log(res);
            if (res?.data?.length > 0) {
              for (let i = 0; i < res?.data?.length; i++) {
                FAQ.FAQAnswer.push({
                  FAQAnswerText: `${process.env.REACT_APP_FRONTEND_URL}/user/orders/${res.data[i]._id}`,
                  FAQAnswerType: "link",
                  FAQAnswerLinkText: res?.data[i].productDocs[0].productName,
                });
              }
            } else {
              FAQ.FAQAnswer.push({
                FAQAnswerText: "No orders found",
                FAQAnswerType: "text",
              });
            }
          },
          (rej) => {
            console.log(rej);
            if (rej.response.status === 401) {
              FAQ.FAQAnswer = [
                {
                  FAQAnswerText: "Please login to view this information",
                  FAQAnswerType: "text",
                },
                {
                  FAQAnswerText: `${process.env.REACT_APP_FRONTEND_URL}/user/login`,
                  FAQAnswerType: "link",
                  FAQAnswerLinkText: "Click here to login",
                },
              ];
            }
            return FAQ.FAQAnswer;
          }
        );
      return FAQ.FAQAnswer;
    } else if (FAQ.FAQDynamicKey === "browseSimilarProducts") {
      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/user/orders/${params.orderId}`,
          {},
          {
            headers: { Authorization: `Bearer ${params.token}` },
          }
        )
        .then(
          async (res) => {
            console.log(res);
            const productCategory = res.data[0].category;
            const productId = res.data[0].productDocs[0]._id;
            console.log(productId);
            await axios
              .get(`${process.env.REACT_APP_BACKEND_URL}/${productCategory}`)
              .then((res) => {
                console.log(res);
                FAQ.FAQAnswer = [];
                for (let i = 0; i < res?.data?.length; i++) {
                  if (res?.data[i]._id !== productId) {
                    FAQ.FAQAnswer.push({
                      FAQAnswerText: `${process.env.REACT_APP_FRONTEND_URL}/${productCategory}/${res?.data[i]._id}`,
                      FAQAnswerType: "link",
                      FAQAnswerLinkText: res?.data[i].productName,
                    });
                  }
                }
              });
          },
          (rej) => {
            console.log(rej);
            if (rej?.response?.status === 401) {
              FAQ.FAQAnswer = [
                {
                  FAQAnswerText: "Please login to view this information",
                  FAQAnswerType: "text",
                },
                {
                  FAQAnswerText: `${process.env.REACT_APP_FRONTEND_URL}/user/login`,
                  FAQAnswerType: "link",
                  FAQAnswerLinkText: "Click here to login",
                },
              ];
            }
          }
        );
      return FAQ.FAQAnswer;
    }
  };

  handleNext() {
    const message = this.createChatBotMessage(
      "Hello, What do you want to know?",
      {
        widget: "FAQ",
      }
    );
    this.updateChatbotState(message);
  }

  populateAnswerHandler = async (FAQ, params) => {
    console.log(FAQ);
    console.log(params);
    if (FAQ.FAQIsDynamic) {
      const response = await this.dynamicAnswerHandle(FAQ, params).then(
        (res) => {
          console.log(res);
          this.populateAnswerHandlerHelper(res);
        }
      );
      console.log(response);
    } else {
      this.populateAnswerHandlerHelper(FAQ.FAQAnswer);
    }
  };

  populateAnswerHandlerHelper(ans) {
    var msg = [];
    for (let a in ans) {
      if (ans[a].FAQAnswerType !== "link")
        msg.push(this.createChatBotMessage(ans[a].FAQAnswerText));
      else
        msg.push(
          this.createChatBotMessage(
            <a
              className="link-text"
              target="_blank"
              href={ans[a].FAQAnswerText}
            >
              {ans[a].FAQAnswerLinkText
                ? ans[a].FAQAnswerLinkText
                : "Click Here!"}
            </a>
          )
        );
    }

    this.updateChatbotStateWithBotMessage(msg);
    var message = this.createChatBotMessage("", {
      widget: "nextset",
    });
    this.updateChatbotState(message);
    console.log(ans);
    console.log("In populateAnswerHandler");
    this.updateChatbotState("In populateAnswerHandler");
  }

  updateChatbotStateWithBotMessage(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, ...message],
    }));
  }
  updateChatbotState(message) {
    this.setState((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  }
}

export default ActionProvider;
