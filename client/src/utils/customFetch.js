// import axios from "axios";

// const customFetch = axios.create({
//   baseURL: "/api/v1",
// });

// export default customFetch;

import axios from "axios";

const customFetch = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default customFetch;
