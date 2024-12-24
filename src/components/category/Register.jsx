import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchPostAuthData,
  fetchPostEmailVerificationData,
  resetAuthState,
  verifyEmail,
} from "../../redux/slices/authSlice";
import mediLogo from "../../assets/medi_logo.png";

const Register = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { verificationCode, isEmailVerified } = useSelector(
    (state) => state.auth
  );
  console.log("verificationCode", verificationCode);
  console.log("isEmailVerified", isEmailVerified);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      alert("이미 로그인된 상태입니다.");
      navigator("/");
    }
  }, [navigator]);

  // 컴포넌트 마운트/언마운트 시 인증 상태 초기화
  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  const [value, setValue] = useState({
    email: "",
    password: "",
    birth_date: "",
    confirm_password: "",
  });

  const [userInputCode, setUserInputCode] = useState("");

  const handleSendVerification = async () => {
    if (!value.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    try {
      const result = await dispatch(
        fetchPostEmailVerificationData(value.email)
      ).unwrap();
      // console.log("이메일 인증 응답:", result); // 디버깅용
      alert("인증 코드가 발송되었습니다.");
    } catch (error) {
      alert("인증 코드 발송 실패");
    }
  };

  // 인증 코드 확인
  const handleVerifyCode = () => {
    // console.log("서버 인증코드", verificationCode.data.verificationCode);
    // console.log("유저 인증코드", userInputCode);

    if (userInputCode === verificationCode.data.verificationCode) {
      // dispatch(verifyEmail({ data: { verificationCode: userInputCode } }));
      dispatch(verifyEmail());

      alert("이메일 인증이 완료되었습니다.");
    } else {
      alert("인증코드가 일치하지 않습니다.");
    }
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value || "",
    });
  };

  // 오늘 날짜를 YYYY-MM-DD 형식으로 가져오는 함수
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 쿼리가 잡히지 않게(경로 표시X)

    // 생년월일 유효성 검사 추가
    const selectedDate = new Date(value.birth_date);
    const today = new Date();

    if (selectedDate > today) {
      alert("생년월일은 오늘 이후의 날짜를 선택할 수 없습니다.");
      return;
    }

    // 이메일 인증 확인
    if (!isEmailVerified) {
      alert("이메일 인증이 필요합니다.");
      return;
    }
    console.log("이메일 인증 확인", isEmailVerified);

    if (
      value.email === "" ||
      value.password === "" ||
      value.confirm_password === "" ||
      value.birth_date === ""
    ) {
      alert("모든 항목은 필수 입력값입니다.");
      return;
    }
    if (value.password !== value.confirm_password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const data = {
      email: value.email,
      password: value.password,
      birth_date: value.birth_date,
    };

    try {
      const response = await dispatch(fetchPostAuthData(data)).unwrap();
      // console.log(response);
      if (response.status === 200) {
        alert(response.data.msg);
        navigator("/login");
        return;
      }
      if (response.data.success === false) {
        alert(response.data.msg);
        return;
      }
    } catch (error) {
      alert(error.msg);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-auto mb-16">
      <div className="logo w-[250px] md:w-[350px] mt-20 md:mt-32 mb-10 md:mb-12">
        <img src={mediLogo} alt="logo" />
      </div>
      <div className="shadow-lg px-6 md:px-12 py-8 md:py-10 w-[90%] md:w-[500px] border mb-16 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
          회원가입
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3"></div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-neutral-700 text-lg">
              이메일
            </label>
            <div className="flex items-center justify-center gap-1.5">
              <input
                type="email"
                placeholder="Email"
                className="w-[70%] px-3 py-2 border rounded-md"
                name="email"
                onChange={handleChange}
              />
              <button
                onClick={handleSendVerification}
                className="w-[30%] py-2 bg-blue-400 text-white rounded-md text-[11px] md:text-[15px] hover:bg-blue-500 transition-all duration-200 "
                type="button"
              >
                인증코드 발송
              </button>
            </div>
          </div>

          {verificationCode && (
            <div className="mb-4">
              <label className="block text-neutral-700 text-lg mb-1">
                이메일 확인
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="인증코드 입력"
                  className="w-[70%] px-3 py-2 border rounded-md"
                  value={userInputCode}
                  onChange={(e) => setUserInputCode(e.target.value)}
                />
                <button
                  onClick={handleVerifyCode}
                  className="w-[30%] py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 text-base"
                  type="button"
                >
                  확인
                </button>
              </div>
            </div>
          )}

          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-neutral-700 text-lg mb-1"
            >
              비밀번호
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md mb-2"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="confirmPassword"
              className="block text-neutral-700 text-lg mb-1"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              placeholder="Comfirm Password"
              className="w-full px-3 py-2 border rounded-md mb-2"
              name="confirm_password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="birth_date"
              className="block text-neutral-700 text-lg mb-1"
            >
              생년월일
            </label>
            <input
              type={`${window.innerWidth < 768 ? (value.birth_date ? "date" : "text") : "date"}`}
              className="w-full px-3 py-2 border rounded-md mb-6"
              name="birth_date"
              onChange={handleChange}
              max={getTodayDate()} // 오늘 날짜를 최대값으로 설정
              required
              placeholder="YYYY-MM-DD"
              onFocus={(e) => (e.target.type = "date")}
              value={value.birth_date}
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-6">
            <button
              className="w-full h-10 md:h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:text-white transition-all duration-200 text-sm md:text-base"
              type="submit"
            >
              가입 하기
            </button>
            <Link to="/" className="w-full h-10 md:h-12">
              <button className="w-full h-10 md:h-12 border border-neutral-700 rounded-md hover:text-blue-600 hover:border-blue-600 transition-all duration-200 text-sm md:text-base">
                가입 취소
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
