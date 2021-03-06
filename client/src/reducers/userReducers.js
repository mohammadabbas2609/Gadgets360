import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_ADMIN_DELETE_SUCCESS,
  USER_ADMIN_DELETE_REQUEST,
  USER_ADMIN_DELETE_FAIL,
  GET_USER_ADMIN_REQUEST,
  GET_USER_ADMIN_SUCCESS,
  GET_USER_ADMIN_FAIL,
  GET_USER_ADMIN_RESET,
  UPDATE_USER_ADMIN_REQUEST,
  UPDATE_USER_ADMIN_SUCCESS,
  UPDATE_USER_ADMIN_FAIL,
  UPDATE_USER_ADMIN_RESET,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_RESET,
} from "../constants/userConstants";

const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, userInfo: null };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, userInfo: null };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

const userForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case USER_FORGOT_PASSWORD_SUCCESS:
      return { loading: false, message: action.payload };
    case USER_FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userPasswordResetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESET_PASSWORD_REQUEST:
      return { loading: true, userInfo: null };
    case USER_RESET_PASSWORD_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case USER_RESET_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true, ...state };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return { userInfo: {} };
    default:
      return state;
  }
};

const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

const getUserFromIdReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case GET_USER_ADMIN_REQUEST:
      return { loading: true };
    case GET_USER_ADMIN_SUCCESS:
      return { loading: false, user: action.payload };
    case GET_USER_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    case GET_USER_ADMIN_RESET:
      return { user: {} };
    default:
      return state;
  }
};

const updateUserFromIdReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_ADMIN_REQUEST:
      return { loading: true };
    case UPDATE_USER_ADMIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case UPDATE_USER_ADMIN_FAIL:
      return { loading: false, success: false, error: action.payload };
    case UPDATE_USER_ADMIN_RESET:
      return { userInfo: {} };
    default:
      return state;
  }
};

const userDeleteReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_ADMIN_DELETE_REQUEST:
      return { loading: true };
    case USER_ADMIN_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_ADMIN_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  getUserFromIdReducer,
  updateUserFromIdReducer,
  userForgotPasswordReducer,
  userPasswordResetReducer,
};
