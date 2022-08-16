import { createChatBotMessage } from "react-chatbot-kit";
import React from "react";
import BotAvatar from "./BotAvatar";
import FAQs from "../widgets/FAQ";
import NextSet from "../widgets/NextSet";
const botName = "Grow ChatBot";

const config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage(`Hello, How can I help you?`, { widget: "FAQ" }),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#00d09c",
    },
    chatButton: {
      backgroundColor: "#00d09c",
    },
  },
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />,
    userAvatar: (props) => <></>,
  },
  state: {
    orders: [],
  },
  widgets: [
    {
      widgetName: "FAQ",
      widgetFunc: (props) => <FAQs {...props} />,
    },
    {
      widgetName: "nextset",
      widgetFunc: (props) => <NextSet {...props} />,
    },
  ],
};

export default config;
