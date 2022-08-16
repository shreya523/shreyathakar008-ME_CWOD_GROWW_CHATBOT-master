class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    if (
      lowerCaseMessage.includes("hi") ||
      lowerCaseMessage.includes("hello") ||
      lowerCaseMessage.includes("hey")
    ) {
      this.actionProvider.greetingsHandler();
    }
  }
}

export default MessageParser;
