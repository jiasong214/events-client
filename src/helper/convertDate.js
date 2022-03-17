export const convertDateFromData = (eventDate) => {
  const today = new Date();
  const newDate = new Date(eventDate);

  const month = newDate.toLocaleString('default', { month: 'short' });
  const date = newDate.getDate();
  const day = newDate.toLocaleDateString('default', { weekday: 'short' });  

  let hour = newDate.getHours() % 12 === 0 ? 12 : newDate.getHours() % 12;
  const min = newDate.getMinutes();
  const ampm = newDate.getHours() >= 11 ? 'pm' : 'am';

  if(newDate.getMonth() === today.getMonth() && newDate.getDate() === today.getDate()) {
    return `Today ${hour}:${min} ${ampm}`;
  }

  if(newDate.getMonth() === today.getMonth() && newDate.getDate() === today.getDate() +1) {
    return `Tomorrow ${hour}:${min} ${ampm}`;
  }

  return `${day}, ${month} ${date} ${hour}:${min} ${ampm}`;
}

export const convertDateFromInput = (date, time) => {
  const dateArr = date.split("-");
  const timeArr = time.split(":");

  let month = parseInt(dateArr[1]) - 1 === -1 ? 0 : parseInt(dateArr[1]) - 1;
  // TODO: am, pm 바뀌어서 들어가는 오류
  let hour = parseInt(timeArr[0]) - 1 === -1 ? 0 : parseInt(timeArr[0]) -1;

  return new Date(dateArr[0], month, dateArr[2], hour, timeArr[1]);
}

export const getDateName = (eventDate) => {
  // 1. check if the event is expired
  const today = new Date();
  const targetDate = new Date(eventDate);

  if(today > targetDate) return "Expired";

  // 2. if not, return date name
  const convertedDate = convertDateFromData(eventDate);

  if(convertedDate.startsWith("Today") || convertedDate.startsWith("Tomorrow")) {
    return convertedDate.split(" ")[0];
  } else {
    let month = convertedDate.split(" ")[1];
    let date = convertedDate.split(" ")[2];

    return `${month} ${date}`;
  }
}