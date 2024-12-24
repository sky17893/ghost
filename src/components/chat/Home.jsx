import React from "react";

const Home = () => {
  const openChatWindow = () => {
    const width = 390;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      "/",
      "chatWindow",
      `width=${width}, height=${height}, left=${left}, top=${top}`
    );
  };
  return (
    <div>
      <button onClick={openChatWindow}>Chat Link</button>
    </div>
  );
};

export default Home;
