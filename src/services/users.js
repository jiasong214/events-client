import http from '../http/http';

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