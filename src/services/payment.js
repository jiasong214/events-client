import http from '../http/http';

export const requestPayment = (data) => {
  return http(`/payment`, {
    method: "POST",
    body: data
  });
}

export const checkPayment = (session_id) => {
  return http(`/payment/success`, {
    method: "POST",
    body: { session_id }
  });
}