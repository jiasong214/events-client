import http from '../http/http';

export const createBooking = async (data) => {
  return http(`/booking`, {
    method: "POST",
    body: data,
  });
}