import http from '../http/http';

export const getRooms = async () => {
  return http(`/room`, {
    method: "GET"
  });
}

export const getRoom = async (id) => {
  return http(`/room/${id}`, {
    method: "GET"
  });
}

export const createRoom = async (data) => {
  return http(`/room`, {
    method: "POST",
    body: {...data},
  });
}

export const updateRoom = async (id, data) => {
  return http(`/room/${id}`, {
    method: "PUT",
    body: {...data},
  });
}

export const deleteRoom = async (id) => {
  return http(`/room/${id}`, {
    method: "DELETE"
  });
}