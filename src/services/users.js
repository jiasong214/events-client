import axios from 'axios';
import http from '../http/http';

const setHeader = (t) => {
  const token = localStorage.getItem("token");

  if(token) {
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
  }else if(t) {
    axios.defaults.headers.common = {'Authorization': `Bearer ${t}`};
  }
}

const removeHeader = () => {
  axios.defaults.headers.common = {'Authorization': ""};
}

export const signup = async (email, password) => {
  return http('/user/signup', {
    method: "POST",
    body: {email, password},
  }).then((data) => {
    localStorage.setItem("token", data.token);
    setHeader(data.token);

    return data;
  });
}

export const login = async (email, password) => {
  return http('/user/login', {
    method: "POST",
    body: {email, password},
  }).then((data) => {
    localStorage.setItem("token", data.token);
    setHeader(data.token);

    return data;
  });
}

export const logout = () => {
  removeHeader();

  localStorage.removeItem("token");
}

export const me = async () => {
  setHeader();

  return http('/user/me', {
    method: "GET",
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