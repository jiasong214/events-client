import http from '../http/http';

// TODO: set header after login , and signup
const setHeader = () => {

}

export const signup = async (email, password) => {
  return http('/user/signup', {
    method: "POST",
    body: {email, password},
  }).then((data) => {
    localStorage.setItem("token", data.token);

    return data;
  });
}

export const login = async (email, password) => {
  return http('/user/login', {
    method: "POST",
    body: {email, password},
  }).then((data) => {
    localStorage.setItem("token", data.token);

    return data;
  });
}

export const me = async () => {
  // const token = localStorage.getItem("token");

  return http('/user/me', {
    method: "GET",
    // headers: { Authorization: `Bearer ${token}` },
  });
}

export const getUserInfo = async (userID) => {
  return http(`/user/${userID}`, {
    method: "GET",
  });
}

export const addWishlistItem = async (userID, eventID) => {
  return http(`/user/${userID}/wishlist`, {
    method: "POST",
    body: {eventID}
  });
}

export const removeWishlistItem = async (userID, eventID) => {
  return http(`/user/${userID}/wishlist/${eventID}`, {
    method: "DELETE"
  });
}