import axios from "axios";
const BASE_URL = "http://localhost:8080";

const setHeader = () => {
  const token = localStorage.getItem("token");

  if(token) {
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
  }
}

const http = async (url, options) => {
  // set header if there is a token in local storage
  setHeader();
  
  let res;

  try {
    res = await axios({
      url: `${BASE_URL}${url}`,
      method: options.method,
      data: options.body,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      }
    });
  } catch(err) {
    throw err;
  }

  return res.data;
}

export default http;