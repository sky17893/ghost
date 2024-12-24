import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HealthInfoDatabase from "../../constants/healthdata";
const HealthDetail = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(HealthInfoDatabase.length / itemsPerPage);

  // 현재 페이지에 해당하는 게시글만 가져오기
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return HealthInfoDatabase.slice(startIndex, endIndex);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log("현재 id:", id);
  console.log("데이터베이스:", HealthInfoDatabase);
  const healthInfo = HealthInfoDatabase.find((info) => info.id === Number(id));
  if (!healthInfo) {
    return (
      <div className="text-center py-8">존재하지 않는 건강 정보입니다.</div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center py-8 mt-6 lg:mt-8">
      <div className="w-[70%] max-w-[1200px]">
        {/* 제목 */}
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">
          {healthInfo.title}
        </h1>
        {/* 날짜 */}
        <div className="text-gray-400 mb-2 text-sm pl-1">
          {healthInfo.date
            ? new Date(healthInfo.date)
                .toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .replace(/\./g, ". ")
            : "날짜 없음"}
        </div>
        <span className="block border-b border-gray-200 w-full mb-4 lg:mb-6"></span>
        {/* 섹션별 내용 */}
        {healthInfo.sections.map((section, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4">
              {section.title}
            </h2>
            {/* 일반 콘텐츠 */}
            {section.content && (
              <div
                className="text-gray-700 mb-6 text-sm lg:text-lg"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )}
            {/* 진단 기준 */}
            {section.diagnosticCriteria && (
              <div className="mb-6">
                {section.diagnosticCriteria.map((criteria, idx) => (
                  <div key={idx} className="mb-2">
                    <span className="font-semibold">{criteria.level}:</span>{" "}
                    {criteria.count}
                  </div>
                ))}
              </div>
            )}
            {/* 질문과 답변 */}
            {section.items &&
              section.items.map((item, idx) => (
                <div key={idx} className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {item.question}
                  </h3>
                  <p
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              ))}
            {/* 단계별 내용 */}
            {section.steps &&
              section.steps.map((step, idx) => (
                <div key={idx} className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  {step.details &&
                    step.details.map((detail, detailIdx) => (
                      <p
                        key={detailIdx}
                        className="text-gray-700 mb-2"
                        dangerouslySetInnerHTML={{ __html: detail }}
                      />
                    ))}
                </div>
              ))}
            {/* 이미지 */}
            {section.image && (
              <div className="mb-6">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full lg:w-1/2 mx-auto rounded-lg"
                />
              </div>
            )}
            {/* 메시지 */}
            {section.message && (
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: section.message }}
              />
            )}
          </div>
        ))}
        <div className="border border-gray-200 w-full mt-10"></div>
        {/* 게시글 목록 */}
        <div className="mt-8">
          <h2 className="text-xl mb-2 pl-1 font-medium">목록</h2>
          <div className="flex justify-between items-center text-sm mb-2 text-gray-400 mx-1">
            <span>글 제목</span>
            <span>작성일</span>
          </div>
          <table className="w-full px-2">
            <tbody>
              {getCurrentItems().map((info, index) => (
                <tr key={index} className="border-b border-t">
                  <td className="py-3">
                    <a
                      href={`/healthdetail/${info.id}`}
                      className="hover:text-blue-500 px-1"
                    >
                      {info.title}
                    </a>
                  </td>
                  <td className="text-gray-500 text-right whitespace-nowrap">
                    {info.date
                      ? new Date(info.date)
                          .toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })
                          .replace(/\./g, ". ")
                      : "날짜 없음"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 페이지네이션 */}
        <div className="pt-4">
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-2 py-1 ${
                currentPage === 1
                  ? "text-gray-300"
                  : "text-gray-500 hover:text-blue-700"
              }`}
            >
              ＜ 이전
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`px-2 py-1 ${
                  num === currentPage ? "text-blue-500" : "text-gray-500"
                } hover:text-blue-700`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 ${
                currentPage === totalPages
                  ? "text-gray-300"
                  : "text-gray-500 hover:text-blue-700"
              }`}
            >
              다음 ＞
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HealthDetail;
