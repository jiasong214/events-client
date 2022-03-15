import * as api from "../../services/users";

// define action type
const PENDING_USER_FETCH = 'user/PENDING_USER_FETCH';
const SUCCEED_USER_FETCH = 'user/SUCCEED_USER_FETCH';
const FAIL_USER_FETCH = 'user/FAIL_USER_FETCH';

// action functions
export const pendingUserFetch = () => ({
  type: PENDING_USER_FETCH
});

export const succeedUserFetch = (user) => ({
  type: SUCCEED_USER_FETCH,
  data: user
});

export const failUserFetch = (err) => ({
  type: FAIL_USER_FETCH,
  error: err
});

// thunk functions
export const login = (email, password) => dispatch => {
  dispatch(pendingUserFetch());

  api.login(email, password)
    .then((data) => dispatch(succeedUserFetch(data)))
    .catch((err) => dispatch(failUserFetch(err)));
}

export const signup = (email, password) => dispatch => {
  dispatch(pendingUserFetch());

  api.signup(email, password)
    .then((data) => dispatch(succeedUserFetch(data)))
    .catch((err) => dispatch(failUserFetch(err)));
}

export const me = () => dispatch => {
  dispatch(pendingUserFetch());

  api.me()
    .then((data) => {
      console.log(data)
      dispatch(succeedUserFetch(data))
    })
    .catch((err) => dispatch(failUserFetch(err)));
}

export const logout = () => dispatch => {
  dispatch(succeedUserFetch());
}

//initial state of module
const initialState = {
  data: {},
  pending: false, 
  error: null
}

//make a reducer and export
export default function reducer (state = initialState, action) {
  console.log(state);
  console.log(action);

  switch(action.type) {
      case PENDING_USER_FETCH:
        return {
          ...state,
          pending: true
        };
      case SUCCEED_USER_FETCH:
        return {
          ...state,
          data: action.data,
          pending: false
        };
      case FAIL_USER_FETCH:
        return {
          ...state,
          pending: false,
          error: action.error
        };
    default:
      return state;
  }
}