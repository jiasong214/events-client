import http from '../http/http';

export const getEvents = async () => {
  return http(`/event`, {
    method: "GET"
  });
}

export const getEventsByType = async (type) => {
  console.log(type);
  
  return http(`/event/type/${type}`, {
    method: "GET",
    body: {type}
  });
}

export const getEvent = async (id) => {
  return http(`/event/${id}`, {
    method: "GET"
  });
}

export const createEvent = async (data) => {
  return http(`/event`, {
    method: "POST",
    body: {...data},
  });
}

export const updateEvent = async (id, data) => {
  return http(`/event/${id}`, {
    method: "PUT",
    body: {...data},
  });
}

export const deleteEvent = async (id) => {
  return http(`/event/${id}`, {
    method: "DELETE"
  });
}