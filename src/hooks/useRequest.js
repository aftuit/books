// const { REACT_APP_BASE_URL } = process.env;
import { API_URL } from "../util/api.js";
export const useRequest = () => {
  const request = async ({
    url,
    method,
    raw,
    headers,
  }) => {
    // if (token)
    //   headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    const options = {
      method,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(raw),
      redirect: "follow",
    };
    return fetch(`${API_URL}${url}`, options).then((res) => res.json());
  };
  return request;
};

export default useRequest;
