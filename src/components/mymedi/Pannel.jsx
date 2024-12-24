import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetMyMediListData } from "../../redux/slices/myMediSlice";
import { openModal } from "../../redux/slices/modalSlice";
import AddItem from "./AddItem";
import Modal from "./Modal";
import Item from "./Item";

const Pannel = () => {
  const loginData = useSelector((state) => state.login.user);
  const userKey = loginData?.id;
  // console.log(userKey);
  const dispatch = useDispatch();

  const getMyMediList = useSelector((state) => state.myMedi.getMyMediListData);
  const isOpen = useSelector((state) => state.modal.isOpen);
  console.log(isOpen);

  useEffect(() => {
    if (!userKey) return;

    const fetchMyMediList = async () => {
      try {
        await dispatch(fetchGetMyMediListData(userKey)).unwrap();
      } catch (error) {
        console.error("Failed to fetch my medi list", error);
      }
    };

    fetchMyMediList();
  }, [dispatch, userKey]);

  const handleOpenModal = () => {
    dispatch(openModal({ modalType: "create", myMediList: null }));
  };

  return (
    <div className="flex justify-center items-center py-10 w-full">
      <div className="panel rounded-lg h-full w-[90%] md:w-[80%] xl:w-[65%] md:border">
        {userKey ? (
          <div className="panel-wrapper w-full h-full flex flex-col items-center">
            {isOpen && <Modal />}
            <h2 className="text-4xl my-6 mb-10 font-semibold">
              나의 약품 목록
            </h2>

            <div className="items w-full flex flex-wrap flex-col gap-4">
              {getMyMediList?.length > 0 ? (
                getMyMediList.map((item) => (
                  <Item key={item.created_at} myMediList={item} />
                ))
              ) : (
                <p className="flex justify-center items-center text-gray-400 py-10">
                  등록된 약이 없습니다.
                </p>
              )}
              <AddItem />
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <button className="flex justify-center items-center bg-gray-300 text-gray-900 py-2 px-4 rounded-md">
              <span className="md:text-sm text-[0.625rem] font-semibold cursor-default">
                로그인이 필요한 서비스 입니다.
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pannel;
