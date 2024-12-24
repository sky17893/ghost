import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET_MEDI_INFO_API_URL,
  SEARCH_MEDI_INFO_API_URL,
} from "../../utils/apiUrl";
import { getRequest } from "../../utils/requestMethods";

// 약품정보 검색
const searchMediInfoFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (term) => {
    const fullPath = `${apiURL}?term=${term}`;
    return await getRequest(fullPath);
  });
};

export const fetchSearchMediInfoData = searchMediInfoFetchThunk(
  "searchMediInfo", // action type
  SEARCH_MEDI_INFO_API_URL
); // thunk 함수 호출

// get thunk function 정의
const getMediInfoFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async () => {
    // console.log(apiURL);
    const fullPath = `${apiURL}`;
    return await getRequest(fullPath);
  });
};
// get_items data
export const fetchGetMediInfoData = getMediInfoFetchThunk(
  "fetchGetMediInfo", // action type
  GET_MEDI_INFO_API_URL // 요청 url
); // thunk 함수 호출


// handleFulfilled 함수 정의 : 요청 성공 시 상태 업데이트 로직을 별도의 함수로 분리
const handleFulfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload; // action.payload에 응답 데이터가 들어있음
};
// handleRejected 함수 정의 : 요청 실패 시 상태 업데이트 로직을 별도의 함수로 분리
const handleRejected = (state, action) => {
  // console.log('Error', action.payload);
  state.isError = true;
  state.errorMessage = action.payload?.msg || "Something went wrong";
};

// get thunk function 정의
const getMediInfoByIdFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (id) => {
    // console.log(apiURL);
    const fullPath = `${apiURL}/${id}`;
    return await getRequest(fullPath);
  });
};
// get_items data
export const fetchGetMediInfoByIdData = getMediInfoByIdFetchThunk(
  "fetchGetMediInfoById", // action type
  GET_MEDI_INFO_API_URL // 요청 url
); // thunk 함수 호출

const medicineSlice = createSlice({
  name: "medicine", // slice 기능 이름
  initialState: {
    // 초기 상태 지정
    getMediInfoData: null,
    selectedMediInfo: null, // 새로운 상태 추가
    searchMediInfoData: null,
    getMediInfoByIdData: null,
  },
  reducers: {
    // 검색 결과 초기화 리듀서 추가
    clearSearchResults: (state) => {
      state.searchMediInfoData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchGetMediInfoData.fulfilled,
        handleFulfilled("getMediInfoData")
      )
      .addCase(fetchGetMediInfoData.rejected, handleRejected)
      .addCase(fetchSearchMediInfoData.pending, (state) => {
        state.searchMediInfoData = null; // 검색 시작 시 초기화
      })
      .addCase(fetchSearchMediInfoData.fulfilled, (state, action) => {
        state.searchMediInfoData = action.payload;
      })
      .addCase(fetchSearchMediInfoData.rejected, (state) => {
        state.searchMediInfoData = null;
        state.isError = true;
      })
      .addCase(clearSearchResults, (state) => {
        state.searchMediInfoData = null;
      })
      .addCase(fetchGetMediInfoByIdData.fulfilled, (state, action) => {
        state.getMediInfoByIdData = action.payload;
      })
      .addCase(fetchGetMediInfoByIdData.rejected, (state) => {
        state.getMediInfoByIdData = null;
        state.isError = true;
      });
  },
}); // slice 객체 저장

export const { clearSearchResults } = medicineSlice.actions;
export default medicineSlice.reducer;
