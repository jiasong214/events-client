import http from '../http/http';

export const login = async (email, password) => {
  return http('/user/login', {
    method: "GET",
    body: JSON.stringify({email, password}),
  });
}

export const signup = async (email, password) => {
  return http('/user/signup', {
    method: "POST",
    body: JSON.stringify({email, password}),
  });
}