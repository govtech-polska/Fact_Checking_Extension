import axios from "axios";

export default function(data) {
  const requestConfig = {
    baseURL: process.env.BASE_URL,
    method: "post",
    url: "/verification-request",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axios(requestConfig);
};
