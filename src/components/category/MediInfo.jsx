import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetMediInfoData,
  fetchSearchMediInfoData,
} from "../../redux/slices/medicineSlice";
import Mediinfoitem from "../details/Mediinfoitem";

function MediInfo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(1);
  const [pagesPerGroup, setPagesPerGroup] = useState(10);
  const itemsPerPage = 4;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getMediInfoData = useSelector(
    (state) => state.medicine.getMediInfoData
  );
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // 모바일 환경
        setPagesPerGroup(5);
      } else {
        // 데스크톱 환경
        setPagesPerGroup(10);
      }
    };

    // 초기 실행
    handleResize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 클린업
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");

    if (searchQuery) {
      setSearchTerm(searchQuery);
      dispatch(fetchSearchMediInfoData(searchQuery))
        .then((response) => {
          if (response.payload) {
            setFilteredData(response.payload);
            setCurrentPage(1);
            setCurrentGroup(1);
          }
        })
        .catch((error) => {
          console.error("검색 중 오류 발생:", error);
        });
    } else {
      // 검색어가 없을 때만 전체 데이터 로드
      dispatch(fetchGetMediInfoData()).then((response) => {
        if (response.payload) {
          setFilteredData(response.payload);
          setCurrentPage(1);
          setCurrentGroup(1);
        }
      });
    }
  }, [location.search, dispatch]);
  // 페이지네이션 처리
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // 검색 처리
  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(fetchSearchMediInfoData(searchTerm))
        .then((response) => {
          if (response.payload) {
            setFilteredData(response.payload);
            setCurrentPage(1);
            setCurrentGroup(1);
          }
        })
        .catch((error) => {
          console.error("검색 중 오류 발생:", error);
        });
    } else {
      setFilteredData(getMediInfoData || []);
    }
  };

  // 엔터 검색 처리
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 약품 상세 페이지 이동
  const handleMediItemClick = (itemId) => {
    navigate(`/medidetail/${itemId}`);
  };

  // 페이지네이션 처리
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const totalGroups = Math.ceil(totalPages / pagesPerGroup);

  const getPageNumbers = () => {
    const start = (currentGroup - 1) * pagesPerGroup + 1;
    const end = Math.min(start + pagesPerGroup - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // 페이지 변경 처리
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 이전 그룹 처리
  const handlePrevGroup = () => {
    if (currentGroup > 1) {
      setCurrentGroup(currentGroup - 1);
      setCurrentPage((currentGroup - 2) * pagesPerGroup + 1);
    }
  };

  // 다음 그룹 처리
  const handleNextGroup = () => {
    if (currentGroup < totalGroups) {
      setCurrentGroup(currentGroup + 1);
      setCurrentPage(currentGroup * pagesPerGroup + 1);
    }
  };

  // 데이터 없을 때 로딩 중 표시
  if (getMediInfoData && Array.isArray(getMediInfoData)) {
  }

  if (!getMediInfoData || !Array.isArray(getMediInfoData)) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-500">
        <div className="content w-[50vmin] h-[50vmin] flex items-center justify-center">
          <div className="pill w-[15vmin] h-[40vmin] flex items-center justify-center flex-col transform rotate-180 animate-spin">
            <div className="side bg-blue-500 relative overflow-hidden w-[11vmin] h-[15vmin] rounded-t-[6vmin]"></div>
            <div className="side bg-gray-300 relative overflow-hidden w-[11vmin] h-[15vmin] rounded-b-[6vmin] border-t-[1vmin] border-gray-800 animate-open"></div>
          </div>
        </div>
      </div>
    );
  }
  console.log(filteredData);

  return (
    <div className="mx-auto p-4 max-w-4xl">
      <main className="mt-16">
        {/* 검색 컴포넌트 */}
        <div className="relative">
          <span className="absolute z-20 -top-6 block bg-sky-100 p-4 w-[30%] rounded-lg"></span>
          <span className="absolute z-10 -top-5 left-8 block bg-sky-200 p-4 w-[30%] rounded-lg"></span>
          <section className="bg-sky-100 p-4 lg:px-8 rounded-md relative z-30">
            <Link
              to="/mediinfo"
              className="text-2xl lg:text-3xl font-semibold"
              onClick={() => {
                setCurrentPage(1);
                setCurrentGroup(1);
                setSearchTerm("");
                setFilteredData(getMediInfoData || []);
              }}
            >
              약품 및 성분 검색
            </Link>
            <div className="relative w-full flex items-center bg-white rounded-md shadow-sm mt-3">
              {/* 데스크톱 장식용 돋보기 */}
              <div className="absolute left-4 hidden md:block">
                <svg
                  className="w-6 h-6 text-blue-300"
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
              </div>
              <input
                type="search"
                className="w-full py-3 px-4 md:px-12 text-md text-gray-900 rounded-md bg-white outline-none" // 모바일에서는 px-4, 데스크톱에서는 px-12
                placeholder="일반의약품 or 성분명 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                required
              />
              {/* 데스크톱 검색 버튼 */}
              <button
                onClick={handleSearch}
                className="absolute right-2 px-4 py-[6px] text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors hidden md:block"
              >
                Search
              </button>
              {/* 모바일 검색 버튼 */}
              <button
                onClick={handleSearch}
                className="absolute right-2 p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors md:hidden"
              >
                <svg
                  className="w-5 h-5"
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
          </section>
        </div>

        {/* 약품 리스트 컴포넌트 */}
        <section>
          <div className="flex flex-col justify-center items-center">
            {currentItems.length > 0
              ? currentItems.map((item) => (
                  <Mediinfoitem
                    key={item.아이디}
                    mediitem={item}
                    onClick={() => handleMediItemClick(item.아이디)}
                  />
                ))
              : searchTerm && (
                  <div className="text-center py-4">검색 결과가 없습��다.</div>
                )}
          </div>

          {/* 페이지네이션 컴포넌트 */}
          {filteredData.length > itemsPerPage && (
            <div className="flex justify-center mt-4 space-x-2">
              {currentGroup > 1 && (
                <button
                  onClick={handlePrevGroup}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  &lt;
                </button>
              )}

              {getPageNumbers().map((number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === number
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  {number}
                </button>
              ))}

              {currentGroup < totalGroups && (
                <button
                  onClick={handleNextGroup}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  &gt;
                </button>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default MediInfo;
