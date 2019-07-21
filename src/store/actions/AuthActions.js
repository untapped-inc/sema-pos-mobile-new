export const SET_LOGIN = 'SET_LOGIN';

export function setLogin(login) {
  return (dispatch) => {
    dispatch({
      type: SET_LOGIN,
      data: login
    })
  };
}

export function handleLogin(loginInfo) {
  // API call here
  console.log('wow');

  return (dispatch) => {
    dispatch({
      type: SET_LOGIN,
      data: {
        token: null,
        isLoggedIn: false,
        usernameOrEmail: null,
        password: null
      }
    })
  };
}