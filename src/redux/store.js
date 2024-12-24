import { combineReducers, configureStore } from "@reduxjs/toolkit";
// combineReducers: 여러 리듀서를 하나로 합쳐주는 함수
// configureStore: 스토어를 생성하는 함수
import authReducer from './slices/authSlice'
import loginReducer from './slices/loginSlice'
import myMediReducer from './slices/myMediSlice'
import modalReducer from './slices/modalSlice'
import medicineReducer from './slices/medicineSlice'

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer, // 값은 만드는 이름
    login: loginReducer,
    myMedi: myMediReducer,
    modal: modalReducer,
    medicine: medicineReducer,
  })
})


export default store