import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Redux 추가

const HealthNews = () => {
  const [newsList, setNewsList] = useState([]); // 전체 뉴스 목록
  const [error, setError] = useState(null); // 에러 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [newsPerPage] = useState(5); // 한 페이지당 5개의 뉴스

  // 로그인한 사용자 정보 가져오기
  const user = useSelector((state) => state.login.user);

  // 화면 크기에 따른 글자 수 제한 함수 추가
  const getTruncateLength = () => {
    if (window.innerWidth >= 1280) {
      // xl
      return { title: 70, desc: 150 };
    } else if (window.innerWidth >= 1024) {
      // lg
      return { title: 50, desc: 100 };
    } else {
      return { title: 30, desc: 60 };
    }
  };

  // useState 추가
  const [truncateLength, setTruncateLength] = useState(getTruncateLength());

  // useEffect에 리사이즈 이벤트 리스너 추가
  useEffect(() => {
    const handleResize = () => {
      setTruncateLength(getTruncateLength());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "/v1/search/news?query=의약품&display=30",
          {
            method: "GET",
            headers: {
              "X-Naver-Client-Id": "dCa8QUFNyajk81l0ykKk",
              "X-Naver-Client-Secret": "J76Yqr6w01",
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const news = data.items.map((item) => ({
          title: decodeHTML(item.title),
          link: item.link,
          description: decodeHTML(item.description),
          pubDate: item.pubDate,
        }));

        setNewsList(news);
      } catch (err) {
        console.error("API 에러:", err);
        setError(err.message);
      }
    };

    fetchNews();
  }, []);

  // HTML 엔티티 디코딩 함수
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  // 페이지 변경 처리 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 현재 페이지에 맞는 뉴스 항목 가져오기
  const indexOfLastNews = currentPage * newsPerPage; // 마지막 뉴스 항목 인덱스
  const indexOfFirstNews = indexOfLastNews - newsPerPage; // 첫 번째 뉴스 항목 인덱스
  const currentNews = newsList.slice(indexOfFirstNews, indexOfLastNews); // 현재 페이지에 해당하는 뉴스 항목

  // 현재 페이지 그룹 계산
  const pageGroupSize = 5; // 한 번에 보여줄 페이지 번호 수
  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(
    startPage + pageGroupSize - 1,
    Math.ceil(newsList.length / newsPerPage)
  );

  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // 뉴스 클릭 시 호출될 함수
  const handleNewsClick = (news) => {
    if (user) {
      // 로그인한 사용자의 열람 기록 가져오기
      const viewedNews = JSON.parse(
        localStorage.getItem(`viewedNews_${user.userId}`) || "[]"
      );

      // 현재 시간과 함께 뉴스 정보 저장
      const newsInfo = {
        ...news,
        viewedAt: new Date().toISOString(),
      };

      // 중복 제거 후 최신 항목 추가 (10개 제한 제거)
      const updatedNews = [
        newsInfo,
        ...viewedNews.filter((item) => item.link !== news.link),
      ];

      // 사용자별 열람 기록 저장
      localStorage.setItem(
        `viewedNews_${user.userId}`,
        JSON.stringify(updatedNews)
      );
    }
  };

  // HTML 태그 제거 함수
  const removeHtmlTags = (str) => {
    return str.replace(/<[^>]*>/g, "");
  };

  // 메인 뉴스 (첫 2개)
  const mainNews = newsList.slice(0, 2);
  // 추가 뉴스 리스트 (다음 5개)
  const additionalNews = newsList.slice(2, 7);

  // 현재 페이지의 메인 뉴스 계산
  const getMainNewsForCurrentPage = () => {
    const startIndex = (currentPage - 1) * 2; // 각 페이지당 2개의 메인 뉴스
    return newsList.slice(startIndex, startIndex + 2);
  };

  return (
    <div className="news">
      <div className="grid grid-cols-12 gap-6">
        {/* 메인 뉴스 섹션 - 왼쪽 */}
        <div className="col-span-12 lg:col-span-8 lg:h-[350px]">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : newsList.length === 0 ? (
            <p className="text-gray-600">Loading...</p>
          ) : (
            <>
              <div className="space-y-4 h-full">
                {(window.innerWidth >= 1024
                  ? newsList.slice(0, 2)
                  : getMainNewsForCurrentPage()
                ).map((news, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 hover:border-blue-400 group p-3 h-[calc(50%-0.5rem)]"
                  >
                    <a
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full flex flex-col"
                      onClick={() => handleNewsClick(news)}
                    >
                      <h2 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-blue-700 break-words">
                        {news.title.replace(/<\/?b>/g, "")}
                      </h2>
                      <p className="text-gray-600 text-sm flex-grow">
                        {news.description.replace(/<\/?b>/g, "").length >
                        truncateLength.desc
                          ? `${news.description
                              .replace(/<\/?b>/g, "")
                              .slice(0, truncateLength.desc)}...`
                          : news.description.replace(/<\/?b>/g, "")}
                      </p>
                      <p className="text-gray-400 text-xs pt-2">
                        {new Date(news.pubDate).toLocaleDateString("ko-KR")}
                      </p>
                    </a>
                  </div>
                ))}
              </div>

              {/* 모바일 환경의 페이지네이션 - 하단 여백 추가 */}
              <div className="lg:hidden flex justify-center mt-6 mb-8 space-x-2">
                {currentGroup > 1 && (
                  <button
                    className="px-2 py-1 rounded text-gray-600 hover:text-blue-600"
                    onClick={() => paginate(startPage - 1)}
                  >
                    &lt;
                  </button>
                )}

                {pageNumbers.map((page) => (
                  <button
                    key={page}
                    className={`px-2 py-1 rounded ${
                      currentPage === page
                        ? "text-blue-600 font-semibold"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                    onClick={() => paginate(page)}
                  >
                    {page}
                  </button>
                ))}

                {endPage < Math.ceil(newsList.length / newsPerPage) && (
                  <button
                    className="px-2 py-1 rounded text-gray-600 hover:text-blue-600"
                    onClick={() => paginate(endPage + 1)}
                  >
                    &gt;
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* 사이드 뉴스 목록 - 오른쪽 */}
        <div className="hidden lg:block col-span-12 lg:col-span-4 rounded-lg border border-gray-200 p-3 lg:h-[350px]">
          <div className="h-full flex flex-col">
            <h3 className="text-base font-semibold mb-3">최신 뉴스</h3>
            <ul className="space-y-2 flex-grow overflow-y-auto">
              {currentNews.map((news, index) => (
                <li
                  key={index}
                  className="w-full border-b border-gray-100 last:border-b-0 pb-2 last:pb-0"
                >
                  <a
                    href={news.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col hover:text-blue-600 py-1"
                    onClick={() => handleNewsClick(news)}
                  >
                    <span className="text-sm font-medium group-hover:text-blue-600 break-words leading-snug">
                      {news.title.replace(/<\/?b>/g, "")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* 데스크톱 환경의 페이지네이션 */}
            <div className="hidden lg:flex justify-center mt-3 space-x-2 pt-2 border-t border-gray-100">
              {currentGroup > 1 && (
                <button
                  className="px-2 py-1 rounded text-gray-600 hover:text-blue-600"
                  onClick={() => paginate(startPage - 1)}
                >
                  &lt;
                </button>
              )}

              {pageNumbers.map((page) => (
                <button
                  key={page}
                  className={`px-2 py-1 rounded ${
                    currentPage === page
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                  onClick={() => paginate(page)}
                >
                  {page}
                </button>
              ))}

              {endPage < Math.ceil(newsList.length / newsPerPage) && (
                <button
                  className="px-2 py-1 rounded text-gray-600 hover:text-blue-600"
                  onClick={() => paginate(endPage + 1)}
                >
                  &gt;
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthNews;
