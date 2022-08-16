import React, { useState } from 'react';
import Chatbot from "react-chatbot-kit";
import "./../../css/chatbot.css";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import "react-chatbot-kit/build/main.css";

const ChatBot = (props) => {
  const [showBot, toggleBot] = useState(false);

  return (
    <div className="chatbot">
      {showBot && (
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      )}
      <button className="chatbotButton" onClick={() => toggleBot((prev) => !prev)}>G</button>
    </div>
  );
};

export default ChatBot;
