// actions.js
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
export const SET_USER = 'SET_USER'

export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});

export const toggleDarkMode = () => ({
  type: TOGGLE_DARK_MODE,
});

export const setUSER = (user) => ({
  type: SET_USER,
  payload: {
    displayName: user.displayName,
    email: user.email,
  }
})
