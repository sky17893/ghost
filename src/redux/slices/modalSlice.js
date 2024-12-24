import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  modalType: "create",
  myMediList: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.myMediList = action.payload.myMediList;
    },

    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
