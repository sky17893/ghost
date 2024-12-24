import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";

const AddItem = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({ modalType: "create", myMediList: null }));
  };
  return (
    <div className="add-item w-[90%] md:w-4/5 mx-auto">
      <div className="flex justify-center">
        <button
          className="w-full border shadow-md bg bg-blue-500 hover:bg-blue-600 py-8 flex items-center justify-center rounded-lg"
          onClick={handleOpenModal}
        >
          <div className="flex items-center gap-2">
            <IoIosAddCircleOutline className="w-6 h-6 text-white font-light hover:text-neutral-200 cursor-pointer" />
            <span className="text-white hover:text-neutral-200 cursor-pointer mb-px">
              Add List
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AddItem;
