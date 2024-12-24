import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Service = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("추가 약품 요청");
  const [response, setResponse] = useState("");
  const [useUserEmail, setUseUserEmail] = useState(false);

  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    const emailInput = document.getElementById('emailInput');
    if (emailInput) {
      emailInput.disabled = !useUserEmail;
      emailInput.style.color = useUserEmail ? 'black' : 'gray';
    }
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleEmailChange = (e) => {
    if (!useUserEmail) {
      setEmail(e.target.value);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setUseUserEmail(e.target.checked);
    const emailInput = document.getElementById('emailInput');
    
    if (e.target.checked) {
      setEmail('');
      emailInput.disabled = false;
      emailInput.style.color = 'black';
    } else {
      if (user?.email) {
        setEmail(user.email);
      }
      emailInput.disabled = true;
      emailInput.style.color = 'gray';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(title, content, email);

    if (!title.trim() || !content.trim()) {
      setResponse("제목과 내용을 입력해주세요.");
      return;
    }

    if (!email.trim()) {
      setResponse("이메일 주소를 입력해주세요.");
      return;
    }

    const data = {
      title,
      content,
      email,
      category
    };

    try {
      const result = await axios.post(
        "http://localhost:8000/email/send-email",
        data
      );
      setResponse("건의사항이 전달 되었습니다.");

      setResponse(result.data.message);
      // 성공시 폼 초기화
      if (result.data.success) {
        setTitle("");
        setContent("");
        if (!useUserEmail) {
          setEmail("");
        }
      }
    } catch (error) {
      setResponse("이메일 전송이 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center py-20">
      <div className="w-[80%] lg:w-[40%] max-w-[1200px]">
        <h2 className="text-3xl font-extrabold mb-6 text-center">
          건의사항
        </h2>
        <div className="flex mb-8 items-center">
          <div className="w-1/4">
            <div className="w-full rounded-l-md bg-blue-500 text-white p-2 text-center">
              카테고리
            </div>
          </div>
          <div className="w-3/4">
            <select 
              className="w-full rounded-r-md border border-gray-300 p-2"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="추가 약품 요청">추가 약품 요청</option>
              <option value="정보 수정요청">정보 수정요청</option>
              <option value="기타 불만사항">기타 불만사항</option>
            </select>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-xl mb-1">제목</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full rounded-md border border-gray-300 p-2"
              placeholder="제목을 입력해주세요"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-xl mb-1">내용</label>
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              className="w-full rounded-md border border-gray-300 p-2 h-32"
              placeholder="내용을 입력해주세요"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block text-xl mb-1">이메일</label>
            <input
              type="email"
              id="emailInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="이메일 주소 입력"
            />
            <div className="flex items-center gap-2 my-2 ml-1">
              <input
                type="checkbox"
                checked={useUserEmail}
                onChange={handleCheckboxChange}
                id="useCustomEmail"
                className="form-checkbox w-3 h-3 text-blue-700 border border-gray-400 cursor-pointer focus:ring-blue-500 mb-[2px]"
              />
              <label htmlFor="useCustomEmail" className="text-sm text-blue-700">다른 이메일 사용</label>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2 mb-6 mt-10">
            <button className="w-full h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:text-white transition-all duration-200" type="submit">전송하기</button>
            <Link to='/' className="w-full h-12">
              <button className="w-full h-12 border border-neutral-700 rounded-md hover:text-blue-600 hover:border-blue-600 transition-all duration-200">전송 취소</button>
            </Link>
          </div>
        </form>
        {response && (
          <p className="mt-4 text-center text-blue-600">{response}</p>
        )}
      </div>
    </div>
  );
};

export default Service;
