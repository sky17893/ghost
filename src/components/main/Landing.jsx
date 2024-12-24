import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import landingImg from "../../assets/main_landing.jpg";
import LandingSubBox from "./LandingSubBox";
import { useNavigate } from "react-router-dom";
import { symptoms } from "../../constants/symptomdata";
import { fetchGetMediInfoData } from "../../redux/slices/medicineSlice";

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const searchResults = useSelector(
  //   (state) => state.medicine.searchMediInfoData
  // );
  // const getMediInfoData = useSelector(
  //   (state) => state.medicine.getMediInfoData
  // );

  useEffect(() => {
    setLoading(true); // 데이터 로딩 시작
    dispatch(fetchGetMediInfoData()).finally(() => setLoading(false));
  }, [dispatch]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    try {
      // symptoms의 title과 types의 title 모두 검색
      const matchedSymptom = symptoms.find(
        (symptom) =>
          symptom.title.includes(searchTerm) || // 메인 증상 검색
          symptom.types.some((type) => type.title.includes(searchTerm)) // 세부 증상 검색
      );

      if (matchedSymptom) {
        // 세부 증상과 일치하는 경우 해당 탭 인덱스 찾기
        const typeIndex = matchedSymptom.types.findIndex((type) =>
          type.title.includes(searchTerm)
        );

        setSearchTerm("");
        // 세부 증상이 있으면 해당 탭 인덱스 + 1을, 없으면 1을 전달
        navigate(
          `/symptomdetail/${matchedSymptom.id}?tab=${
            typeIndex !== -1 ? typeIndex + 1 : 1
          }`
        );
        return;
      }

      navigate(`/mediinfo?search=${encodeURIComponent(searchTerm)}`);

      setSearchTerm("");
    } catch (error) {
      console.error("검색 오류:", error);
      alert("검색 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="relative">
      {loading && <div className="loading-spinner">Loading...</div>}{" "}
      {/* 로딩 스피너 추가 */}
      <div className="overflow-hidden flex justify-center items-center relative max-h-[600px] min-h-[300px]">
        <div className="absolute opacity-30 overlay w-full h-full bg-white left-0 top-0"></div>
        <div
          className="slogan-box absolute 
          left-1/2 transform -translate-x-1/2 
          lg:left-[20%] lg:transform-none 
          top-[25%] flex flex-col gap-4"
        >
          <h2
            style={{ fontFamily: "LemonMilk" }}
            className="text-6xl hidden lg:block"
          >
            MediBook
          </h2>
          <p className="text-base lg:text-lg tracking-tight hidden lg:block">
            약물의 효능, 성분, 부작용을 잘 파악하여 안전한
            <br />
            셀프 메디케이션을 할 수 있도록 돕는
            <br />
            가정용 약물 정보 및 관리 사이트입니다.
          </p>

          <form
            className="flex items-center w-full"
            onSubmit={handleSearch}
          >
            <div className="relative w-full flex items-center rounded-md bg-white shadow-sm">
              <input
                type="search"
                className="w-[260px] md:w-full py-4 pl-4 pr-12 text-md text-gray-900 outline-none bg-white rounded-md"
                placeholder="증상 or 일반의약품 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                required
              />
              <button
                type="submit"
                className="absolute right-4 text-blue-300 hover:text-blue-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
        <img
          src={landingImg}
          className="w-full max-h-[600px] min-h-[300px]"
          alt=""
        />
      </div>
      <div
        className="bottom-box absolute 
        bottom-[-50%]
        sm:bottom-[-40%] 
        md:bottom-[-30%] 
        lg:bottom-[-20%] 
        z-0 w-[90%] 
        sm:w-[600px] 
        lg:w-[800px] 
        xl:w-[1100px] 
        left-1/2 transform -translate-x-1/2"
      >
        <LandingSubBox />
      </div>
    </div>
  );
};

export default Landing;
