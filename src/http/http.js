const http = async (url, options) => {
  const BASE_URL = ""
  let data;

  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      ...options,
      header: {
        ...options.headers,
        'Content-Type': 'application/json',
      }
    });

    data = await res.json();
  } catch(err) {
    throw err;
  }

  return data;
}

export default http;