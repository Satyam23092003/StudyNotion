// import axios from "axios";

// export const axiosInstance = axios.create({
//     // baseURL: "https://studynotion-fcvt.onrender.com/api/v1", // ✅ your backend
//     withCredentials: true, // ✅ VERY IMPORTANT for cookie-based auth
// });

// export const apiConnector = (method, url, bodyData, headers, params) => {
//   return axiosInstance({
//     method: `${method}`,
//     url: `${url}`,
//     data: bodyData ? bodyData : null,
//     headers: headers ? headers : null,
//     params: params ? params : null,
//   });
// };


import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://study-notion-web-app-backend.vercel.app/api/v1", // ✅ backend base URL
  withCredentials: true, // ✅ keep this true if using cookies for auth
});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: method,
    url: url,   // 👉 pass only the relative path, e.g. "/course/addSubSection"
    data: bodyData || null,
    headers: headers || {},
    params: params || {},
  });
};
