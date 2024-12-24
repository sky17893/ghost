import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./components/main/Home";
import Login from "./components/category/Login";
import Register from "./components/category/Register";
import Mypage from "./components/category/Mypage";
import NewPage from "./components/details/NewPage";
import HealthInfo from "./components/category/HealthInfo";
import MediInfo from "./components/category/MediInfo";
import HealthNews from "./components/details/HealthNews";
import Chatbot from "./components/category/Chatbot";
import HealthDetail from "./components/details/HealthDetail";
import MemberInfo from "./components/details/MemberInfo";
import Medidetail from "./components/details/Medidetail";
import SymptomDetail from "./components/details/Symptomdetail";
import Service from "./components/category/Service";
import Pannel from "./components/mymedi/Pannel";
import Modal from "./components/mymedi/Modal";
import Item from "./components/mymedi/Item";
import AddItem from "./components/mymedi/AddItem";
import Chat from "./components/chat/Chat";
import FindPwd from "./components/details/FindPwd";
import ResetPwd from "./components/details/ResetPwd";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/newpage" element={<NewPage />} />
            <Route path="/healthinfo" element={<HealthInfo />} />
            <Route path="/mediinfo" element={<MediInfo />} />
            <Route path="/healthnews" element={<HealthNews />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/service" element={<Service />} />
            <Route path="/healthdetail/:id" element={<HealthDetail />} />
            <Route path="/symptomdetail/:id" element={<SymptomDetail />} />
            <Route path="/memberinfo" element={<MemberInfo />} />
            <Route path="/mediDetail/:id" element={<Medidetail />} />
            <Route path="/mymedi_list" element={<Pannel />} />
            <Route path="/" element={<Modal />} />
            <Route path="/" element={<Item />} />
            <Route path="/" element={<AddItem />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/findpwd" element={<FindPwd />} />
            <Route path="/resetpwd" element={<ResetPwd />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
