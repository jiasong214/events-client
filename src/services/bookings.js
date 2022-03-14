import http from '../http/http';

// export const getBookings = async () => {
//   return http(`/booking`, {
//     method: "GET"
//   });
// }

// export const getBooking = async (id) => {
//   return http(`/booking/${id}`, {
//     method: "GET"
//   });
// }

export const createBooking = async (userID, eventID, seatsArr) => {
  return http(`/booking`, {
    method: "POST",
    body: {userID, eventID, seats: seatsArr},
  });
}