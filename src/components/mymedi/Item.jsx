import React from "react";
import { MdEditDocument, MdDelete } from "react-icons/md";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { FaCalendarCheck } from "react-icons/fa6";
import favi from "../../assets/medi_favi.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeleteMyMediListData,
  fetchGetMyMediListData,
} from "../../redux/slices/myMediSlice";
import { openModal } from "../../redux/slices/modalSlice";
import { Tooltip } from "@mui/material";

const Item = ({ myMediList }) => {
  // console.log(myMediList);
  const {
    user_email,
    medicine_id,
    medi_name,
    exp_date,
    main_symptom,
    notification,
  } = myMediList;

  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const loginData = useSelector((state) => state.login.user);
  const userKey = loginData?.id;

  const handleDeleteItem = async () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");

    if (confirm) {
      if (!user_email) {
        alert("잘못된 사용자입니다.");
        return;
      }
      console.log("삭제할 medicine_id:", medicine_id);

      try {
        await dispatch(fetchDeleteMyMediListData(medicine_id)).unwrap();
        alert("삭제되었습니다.");
        await dispatch(fetchGetMyMediListData(userKey)).unwrap();
      } catch (error) {
        alert("삭제에 실패하였습니다.");
        console.error("삭제 실패: ", error);
      }
    }
  };
  const handleOpenDetailModal = () => {
    dispatch(openModal({ modalType: "details", myMediList }));
  };

  const handleOpenUpdateModal = () => {
    dispatch(openModal({ modalType: "update", myMediList }));
  };

  return (
    <div className="item w-[90%] md:w-4/5 mx-auto">
      <div className="w-full shadow-md border py-6 px-7 flex flex-wrap lg:flex-nowrap justify-between items-center gap-4 rounded-lg">
        <div className="w-[calc(60%-1.5rem)] lg:w-[20%] flex order-1 items-center gap-3">
          <img
            src={favi}
            alt="list"
            className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 "
          />
          <div className="title-box lg:px-3 py-1">
            <h2 className="item-title font-semibold text-xl md:text-2xl ">
              {medi_name}
            </h2>
          </div>
        </div>

        <p className="lg:order-2 hidden lg:block w-[30%] px-1 text-sm sm:text-xl">
          대표증상: {main_symptom}
        </p>

        <div className="exp-date-box w-full lg:w-[35%] flex order-3 lg:order-2 items-center justify-center">
          {notification && (
            <Tooltip title="알림설정" arrow placement="top">
              <div>
                <FaCalendarCheck className="w-5 h-5 text-yellow-300" />
              </div>
            </Tooltip>
          )}
          <p className="px-1 text-sm sm:text-xl">
            유효기간: {formatDate(exp_date)}
          </p>
        </div>

        <div className="btn-box w-[30%] lg:w-[12%] flex order-2 lg:order-3 items-center justify-end lg:gap-2">
          <Tooltip title="자세히" arrow placement="top">
            <button onClick={handleOpenDetailModal}>
              <BiSolidMessageAltDetail className="w-6 h-6 text-blue-600" />
            </button>
          </Tooltip>
          <Tooltip title="수정하기" arrow placement="top">
            <button onClick={handleOpenUpdateModal}>
              <MdEditDocument className="w-6 h-6 text-sky-300" />
            </button>
          </Tooltip>
          <Tooltip title="삭제하기" arrow placement="top">
            <button className="delete text-gray-700" onClick={handleDeleteItem}>
              <MdDelete className="w-6 h-6" />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Item;
