import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  ALL_USERS_SUCCESS,
  ALL_USERS_REQUEST,
  ALL_USERS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  CLEAR_ERRORS,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
} from "../constants/userConstants.js";

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const { data } = await axios.post(`/api/v1/register`, userData);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_USER_REQUEST });
    const { data } = await axios.post(`/api/v1/admin/user/new`, userData);
    dispatch({ type: CREATE_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post(`/api/v1/login`, { email, password });
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (e) {
    dispatch({ type: LOGIN_FAIL, payload: e.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get(`/api/v1/me`);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (e) {
    dispatch({ type: LOAD_USER_FAIL, payload: e.response.data.message });
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const { data } = await axios.put(`/api/v1/me/update`, userData);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (e) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: e.response.data.message });
  }
};

// export const updatePassword = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_PASSWORD_REQUEST });
//     const { data } = await axios.put(`/api/v1/password/update`, userData);
//     dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
//   } catch (e) {
//     dispatch({ type: UPDATE_PASSWORD_FAIL, payload: e.response.data.message });
//   }
// };

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/logout`);
    dispatch({ type: LOGOUT_SUCCESS, payload: data.message });
  } catch (e) {
    dispatch({ type: LOGOUT_FAIL, payload: e.response.data.message });
  }
};

// admin actions
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/users`);
    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (e) {
    dispatch({ type: ALL_USERS_FAIL, payload: e.response.data.message });
  }
};

export const updateUser = (id, user) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const { data } = await axios.put(`/api/v1/admin/user/${id}`, user);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (e) {
    dispatch({ type: UPDATE_USER_FAIL, payload: e.response.data.message });
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (e) {
    dispatch({ type: USER_DETAILS_FAIL, payload: e.response.data.message });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
    dispatch({ type: DELETE_USER_SUCCESS, payload: data.message });
  } catch (e) {
    dispatch({ type: DELETE_USER_FAIL, payload: e.response.data.message });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
