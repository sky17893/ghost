class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleMessage = async (message) => {
    const loadingId = Date.now();
    const loadingMessage = {
      ...this.createChatBotMessage("답변을 생성하고 있습니다...", {
        loading: true,
        withAvatar: true,
      }),
      id: loadingId,
    };

    try {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, loadingMessage],
      }));

      const searchQuery = message.includes('약') ? message : `${message} 약`;

      const response = await fetch("http://localhost:8000/chat1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: searchQuery }),
      });

      const data = await response.json();

      if (data.answer) {
        this.setState((prevState) => ({
          ...prevState,
          messages: [
            ...prevState.messages.filter((msg) => msg.id !== loadingId),
            this.createChatBotMessage(data.answer),
          ],
        }));
      }
    } catch (error) {
      console.error("Error:", error);

      this.setState((prevState) => ({
        ...prevState,
        messages: [
          ...prevState.messages.filter((msg) => msg.id !== loadingId),
          this.createChatBotMessage("오류가 발생했습니다. 다시 시도해주세요."),
        ],
      }));
    }
  };

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
