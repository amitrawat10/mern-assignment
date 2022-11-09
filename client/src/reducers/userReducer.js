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
  UPDATE_PROFILE_RESET,
  CLEAR_ERRORS,
  ALL_USERS_SUCCESS,
  ALL_USERS_REQUEST,
  ALL_USERS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_RESET,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
} from "../constants/userConstants.js";
export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
    case REGISTER_USER_REQUEST:
      return {
        isLoading: true,
        isAuthenticated: false,
      };

    case CREATE_USER_REQUEST:
      return {
        isLoading: true,
        ...state,
      };
    case CREATE_USER_SUCCESS:
      return {
        isLoading: false,
        ...state,
      };

    case CREATE_USER_FAIL:
      return {
        error: action.payload,
        isLoading: false,
        ...state,
      };

    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };

    case LOAD_USER_FAIL:
      return {
        error: action.payload,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };

    case LOGOUT_SUCCESS:
      return {
        isAuthenticated: false,
        user: null,
        isLoading: false,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// export const createUserReducer =()

export const allUserReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case ALL_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Both for admin and user
export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case UPDATE_USER_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUpdated: action.payload,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };
    case UPDATE_PROFILE_RESET:
    case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
