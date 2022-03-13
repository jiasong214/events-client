import axios from "axios";
const BASE_URL = "http://localhost:8080"

const http = async (url, options) => {
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