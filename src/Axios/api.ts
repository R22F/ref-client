import axios, {AxiosInstance} from "axios";

export const useAxiosInstanceNoToken = (): AxiosInstance => {
  const url = process.env.REACT_APP_SERVER_URL;

  return axios.create({
    baseURL: url,
  });
};

export const useAxiosInstance = (): AxiosInstance => {
  const token = localStorage.getItem("Authorization")
  const url = process.env.REACT_APP_SERVER_URL;

  return axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
    },
  });
};
