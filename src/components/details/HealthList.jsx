import React, { useState } from "react";
import { Link } from "react-router-dom";
import HealthInfoDatabase from "../../constants/healthdata";

const HealthList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // 현재 페이지의 게시물 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = HealthInfoDatabase.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(HealthInfoDatabase.length / postsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {currentPosts.map((info, index) => (
          <Link to={`/healthdetail/${info.id}`} key={index}>
            <div className="border p-4 rounded-lg hover:shadow-lg transition-shadow h-[300px] flex flex-col group">
              <h2 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-blue-700">
                {info.title.substring(0, 24)}...
              </h2>
              <p className="text-gray-600 text-sm h-[48px] overflow-hidden">
                {info.sections[0].content?.substring(0, 45)}...
              </p>
              <p className="text-gray-400 text-xs flex justify-end group-hover:text-blue-500">
                +자세히
              </p>
              {info.defaultImage ? (
                <img
                  src={info.defaultImage}
                  alt={info.title}
                  className="w-full h-32 md:h-40 object-cover rounded-md mt-2 overflow-hidden"
                />
              ) : info.sections[0].image ? (
                <img
                  src={info.sections[0].image}
                  alt={info.title}
                  className="h-24 w-full object-cover mt-2"
                />
              ) : (
                <div className="h-32 mt-2 bg-gray-200 rounded-md flex items-center justify-center">
                  <p className="text-gray-400 text-sm">이미지 없음</p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* 페이지네이션 UI */}
      <div className="flex justify-center mt-5 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`px-4 py-2 rounded ${
              currentPage === pageNum
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HealthList;
