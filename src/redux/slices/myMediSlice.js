import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { POST_MY_MEDI_API_URL, GET_MY_MEDI_LIST_API_URL, DELETE_MY_MEDI_LIST_API_URL, UPDATE_MY_MEDI_LIST_API_URL } from '../../utils/apiUrl'
import { postRequest, getRequest, deleteRequest, putRequest } from '../../utils/requestMethods'


// 약품 등록 요청 함수
const postMyMediFetchThunk = (actionType, apiURL)=>{
  return createAsyncThunk(actionType, async (postData, { rejectWithValue }) => {
    // console.log(postData);
    try {
      const options = {
        body: JSON.stringify(postData), // 표준 JSON 문자열로 변환 json 형식일 때
        // method: "POST",
        // body: postData, // json 형식이 아닐 때
      };
      const response = await postRequest(apiURL, options);
      return response; // { status, data } 형태로 반환
    }
    catch (error) {
      // 에러 시 상태 코드와 메시지를 포함한 값을 rejectWithValue로 전달
      return rejectWithValue(error);
    }
  });
}

export const fetchPostMyMediData = postMyMediFetchThunk(
  'fetchPostMyMedi', // action type
  POST_MY_MEDI_API_URL // 요청 url
)

// get thunk function 정의
const getMyMediListFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (userId) => {
    // console.log(apiURL, userId);
    // return await getRequest(apiURL);
    const fullPath = `${apiURL}/${userId}`;
    return await getRequest(fullPath);
  });
};

// get_items data
export const fetchGetMyMediListData = getMyMediListFetchThunk(
  "fetchGetMyMediList", // action type
  GET_MY_MEDI_LIST_API_URL // 요청 url
); // thunk 함수 호출

// delete thunk function 정의
const deleteMyMediListFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (id) => {
    console.log("삭제 요청 URL:", `${apiURL}/${id}`);
    console.log("삭제할 ID:", id);
    const options = {
      method: "DELETE",
    };
    const fullPath = `${apiURL}/${id}`;
    return await deleteRequest(fullPath, options);
  });
};

// delete_item
export const fetchDeleteMyMediListData = deleteMyMediListFetchThunk(
  "fetchDeleteMyMediList",
  DELETE_MY_MEDI_LIST_API_URL
);

// update thunk function 정의
const updateMyMediListFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (updateData) => {
    // console.log(updateData , apiURL);
    const options = {
      body: JSON.stringify(updateData), // 표준 json 문자열로 변환
    };
    const fullPath = `${apiURL}/${updateData.mediId}`;
    return await putRequest(fullPath, options);
  });
};

// update_item
export const fetchUpdateMyMediListData = updateMyMediListFetchThunk(
  "fetchUpdateMyMediList",
  UPDATE_MY_MEDI_LIST_API_URL
);

// handleFulfilled 함수 정의 : 요청 성공 시 상태 업데이트 로직을 별도의 함수로 분리
const handleFulfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload; // action.payload에 응답 데이터가 들어있음
};

// handleRejected 함수 정의 : 요청 실패 시 상태 업데이트 로직을 별도의 함수로 분리
const handleRejected = (state, action) => {
  // console.log('Error', action.payload);
  state.isError = true;
  state.errorMessage = action.payload?.msg || "Something went wrong"
};


const myMediSlice = createSlice({
  name: 'myMedi', // slice 기능 이름
  initialState: {
    // 초기 상태 지정
    postMyMediData: null,
    getMyMediListData: null,
    deleteMyMediListData: null,
    updateMyMediListData: null,
  },
  
  extraReducers: (builder)=>{
    builder
      .addCase(fetchPostMyMediData.fulfilled, handleFulfilled('postMyMediData'))
      .addCase(fetchPostMyMediData.rejected, handleRejected)

      .addCase(fetchGetMyMediListData.fulfilled, handleFulfilled("getMyMediListData")) //요청 성공시
      .addCase(fetchGetMyMediListData.rejected, handleRejected) // 요청 실패시

      .addCase(fetchDeleteMyMediListData.fulfilled, handleFulfilled("deleteMyMediListData")) //요청 성공시
      .addCase(fetchDeleteMyMediListData.rejected, handleRejected)

      .addCase(fetchUpdateMyMediListData.fulfilled, handleFulfilled("updateMyMediListData")) //요청 성공시
      .addCase(fetchUpdateMyMediListData.rejected, handleRejected); // 요청 실패시
    
  }
})  // slice 객체 저장


export default myMediSlice.reducer;