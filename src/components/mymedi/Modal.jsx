import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetMyMediListData,
  fetchPostMyMediData,
  fetchUpdateMyMediListData,
} from "../../redux/slices/myMediSlice";
import { closeModal } from "../../redux/slices/modalSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const { modalType, myMediList, isOpen } = useSelector((state) => state.modal);
  console.log(modalType, myMediList, isOpen);
  const user = useSelector((state) => state.login.user);

  const [value, setValue] = useState({
    mediName: "",
    companyName: "",
    buyingDate: "",
    expDate: "",
    mainSymptom: "",
    memo: "",
    user_id: user?.id,
    mediId: "",
    notification: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value || "",
    }));
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
    e.preventDefault();

    if (!user) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    // 날짜 유효성 검사 추가
    const today = new Date();
    const buyingDate = new Date(value.buyingDate);
    const expDate = new Date(value.expDate);

    if (buyingDate > today) {
      alert("구입/개봉날짜는 미래 날짜를 선택할 수 없습니다.");
      return;
    }

    if (expDate < today) {
      alert("유효기간은 과거 날짜를 선택할 수 없습니다.");
      return;
    }

    if (value.mediName === "" || value.expDate === "") {
      alert("제품명과 유효기간은 필수 입력값입니다.");
      return;
    }

    // 알림 설정 시 유효기간 체크
    if (value.notification && value.expDate) {
      const today = new Date();
      const expDate = new Date(value.expDate);
      const diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));

      if (diffDays <= 7) {
        alert("유효기간이 7일 이내인 경우 알림 설정이 불가합니다.");
        return;
      }
    }

    try {
      if (modalType === "create" && myMediList === null) {
        await dispatch(fetchPostMyMediData(value)).unwrap();
        alert("등록되었습니다.");
      } else if (modalType === "update" && myMediList) {
        await dispatch(fetchUpdateMyMediListData(value)).unwrap();
        alert("수정되었습니다.");
      }

      handleCloseModal();

      await dispatch(fetchGetMyMediListData(user?.id)).unwrap();
    } catch (error) {
      console.error("등록 중 오류가 발생했습니다.", error);
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const showModalTitle = (modalType, str1, str2, str3) => {
    switch (modalType) {
      case "update":
        return str1;
      case "details":
        return str2;
      default:
        return str3;
    }
  };

  const modalTitle = showModalTitle(modalType, "수정", "상세", "등록");

  const btnTitle = showModalTitle(modalType, "수정", "", "등록");

  const convertToKST = (date) => {
    const koreaTime = new Date(date);
    koreaTime.setHours(koreaTime.getHours() + 9); // KST는 UTC+9
    return koreaTime.toISOString().split("T")[0]; // 날짜만 반환 (yyyy-mm-dd)
  };

  useEffect(() => {
    if (
      (modalType === "details" && myMediList) ||
      (modalType === "update" && myMediList)
    ) {
      setValue({
        mediName: myMediList.medi_name,
        companyName: myMediList.company_name,
        buyingDate: myMediList.buying_date
          ? convertToKST(myMediList.buying_date) // 한국 시간으로 변환
          : "",
        expDate: myMediList.exp_date
          ? convertToKST(myMediList.exp_date) // 한국 시간으로 변환
          : "",
        mainSymptom: myMediList.main_symptom,
        memo: myMediList.memo,
        mediId: myMediList.medicine_id,
        user_id: user?.id,
        notification: myMediList.notification,
      });
    } else {
      setValue({
        mediName: "",
        companyName: "",
        buyingDate: "",
        expDate: "",
        mainSymptom: "",
        memo: "",
        mediId: "",
        user_id: user?.id,
        notification: false,
      });
    }
  }, [modalType, myMediList, user?.id]);

  console.log(myMediList);

  const handleNotificationChange = (e) => {
    const isChecked = e.target.checked;

    if (isChecked && value.expDate) {
      // 유효기간과 오늘 날짜의 차이 계산
      const today = new Date();
      const expDate = new Date(value.expDate);
      const diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));

      if (diffDays <= 7) {
        alert("유효기간이 7일 이내인 경우 알림 설정이 불가합니다.");
        return;
      }
    }

    setValue((prev) => ({
      ...prev,
      notification: isChecked,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-auto">
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="relative bg-white rounded-lg p-10 flex flex-col gap-6">
          <div className="wrapper">
            <h2 className="title text-2xl font-bold flex justify-center">
              My 약품 관리 {modalTitle}
            </h2>
            <br></br>
            <IoMdClose
              className="absolute top-2 right-2 cursor-pointer"
              onClick={handleCloseModal}
            />

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="form-item">
                <label htmlFor="medi_name">제품명</label>
                <input
                  type="text"
                  id="mediName"
                  name="mediName"
                  value={value.mediName}
                  placeholder="제품명을 입력해주세요."
                  onChange={handleChange}
                  {...(modalType === "details" && { disabled: true })}
                />
              </div>
              <div className="form-item">
                <label htmlFor="company_name">회사명</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={value.companyName}
                  placeholder="제조회사를 입력해주세요."
                  onChange={handleChange}
                  {...(modalType === "details" && { disabled: true })}
                />
              </div>
              <div className="form-item">
                <label htmlFor="buying_date">구입/개봉날짜</label>
                <input
                  type={`${window.innerWidth < 768 ? (value.birth_date ? "date" : "text") : "date"}`}
                  id="buyingDate"
                  name="buyingDate"
                  value={value.buyingDate}
                  onChange={handleChange}
                  max={getTodayDate()}
                  {...(modalType === "details" && { disabled: true })}
                  placeholder="YYYY-MM-DD"
                  onFocus={(e) => (e.target.type = "date")}
                  className="w-full p-2" 
                />
              </div>
              <div className="form-item">
                <div className="expDate-box">
                  <label htmlFor="exp_date">유효기간</label>
                  <input
                    type={`${window.innerWidth < 768 ? (value.birth_date ? "date" : "text") : "date"}`}
                    id="expDate"
                    name="expDate"
                    value={value.expDate}
                    onChange={handleChange}
                    min={getTodayDate()}
                    {...(modalType === "details" && { disabled: true })}
                    placeholder="YYYY-MM-DD"
                    onFocus={(e) => (e.target.type = "date")}
                    className="w-full p-2" 
                  />
                </div>
                <div className="flex justify-center items-baseline gap-2">
                  <input
                    type="checkbox"
                    id="notification"
                    name="notification"
                    checked={value.notification}
                    onChange={handleNotificationChange}
                    {...(modalType === "details" && { disabled: true })}
                    className="form-checkbox w-3 h-3 text-blue-700 border border-gray-400 cursor-pointer focus:ring-blue-500 mb-[2px]"
                  />
                  <label
                    htmlFor="notification"
                    className="text-sm text-blue-700"
                  >
                    유효기간 알림 받기
                  </label>
                </div>

                {value.notification && (
                  <div className="text-sm text-gray-500 mt-1">
                    <p>※ 유효기간 7일 전에 이메일로 알림을 보내드립니다.</p>
                    <p className="text-xs text-red-500">
                      (유효기간까지 7일 이상 남아있어야 알림 설정이 가능합니다.)
                    </p>
                  </div>
                )}
              </div>
              <div className="form-item">
                <label htmlFor="main_symptom">대표증상</label>
                <input
                  type="text"
                  id="mainSymptom"
                  name="mainSymptom"
                  value={value.mainSymptom}
                  placeholder="대표증상을 입력해주세요."
                  onChange={handleChange}
                  {...(modalType === "details" && { disabled: true })}
                />
              </div>
              <div className="form-item flex flex-col gap-2">
                <label htmlFor="memo">NOTE</label>
                <textarea
                  rows="4"
                  id="memo"
                  name="memo"
                  value={value.memo}
                  onChange={handleChange}
                  {...(modalType === "details" && { disabled: true })}
                ></textarea>
              </div>
              <button
                className={`btn h-10 !text-lg ${
                  modalType === "details" ? "hidden" : ""
                }`}
                type="submit"
              >
                {btnTitle}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
