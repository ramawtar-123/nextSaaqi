// reducers.js
import { LOGIN, LOGOUT, TOGGLE_DARK_MODE, SET_USER } from '../actions/index';

const initialState = {
  isLoggedIn: false,
  isDarkMode: true,
  user: {}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
};

export default rootReducer;
