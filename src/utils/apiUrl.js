// const rootPath = "http://localhost:8000";
const rootPath = "https://back.aicc4hyeonji.site";

const POST_AUTH_API_URL = `${rootPath}/auth/register`;
const POST_LOGIN_API_URL = `${rootPath}/auth/login`;
const POST_MY_MEDI_API_URL = `${rootPath}/myPage/post_myMedi`;
const GET_MY_MEDI_LIST_API_URL = `${rootPath}/myPage/get_myMediList`;
const DELETE_MY_MEDI_LIST_API_URL = `${rootPath}/myPage/delete_myMediList`;
const UPDATE_MY_MEDI_LIST_API_URL = `${rootPath}/myPage/update_myMediList`;
const GET_MEDI_INFO_API_URL = `${rootPath}/medicine/info`;
const POST_EMAIL_VERIFICATION_API_URL = `${rootPath}/auth/emailVerification`;
const SEARCH_MEDI_INFO_API_URL = `${rootPath}/medicine/search`;
const UPDATE_AUTH_API_URL = `${rootPath}/auth/update_user`;
const DELETE_AUTH_API_URL = `${rootPath}/auth/delete_user`;

export {
  POST_AUTH_API_URL,
  POST_LOGIN_API_URL,
  POST_MY_MEDI_API_URL,
  GET_MY_MEDI_LIST_API_URL,
  DELETE_MY_MEDI_LIST_API_URL,
  UPDATE_MY_MEDI_LIST_API_URL,
  GET_MEDI_INFO_API_URL,
  POST_EMAIL_VERIFICATION_API_URL,
  SEARCH_MEDI_INFO_API_URL,
  UPDATE_AUTH_API_URL,
  DELETE_AUTH_API_URL,
};
