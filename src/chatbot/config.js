import { createChatBotMessage } from "react-chatbot-kit";
import logo from "../assets/medi_logo.png";

const CustomHeader = () => {
  return <div className="react-chatbot-kit-chat-header">
    <img src={logo} alt="logo" className="w-24" />
    <span style={{ fontFamily: "Pretendard" }} className="text-black">
      &nbsp;무엇이든 물어보세요!
    </span>
    </div>;
};

const config = {
  initialMessages: [createChatBotMessage("안녕하세요! 무엇을 도와드릴까요?")],
  botName: "test",
  customComponents: {
    // 여기서 헤더를 커스텀 컴포넌트로 교체
    header: () => <CustomHeader />
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
    loadingDots: {
      color: "#376B7E",
      backgroundColor: "#376B7E",
    },
  },
};

export default config;
