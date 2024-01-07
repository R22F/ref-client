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

export const checkTokenValidate = (res: any, setIsModalOpen:any):any=> {
  try {
    const code = res.response.status
    switch (code) {
      case 417:
        window.alert("로그인 정보가 만료되었습니다.")
        localStorage.removeItem("Authorization")

        setIsModalOpen(true)
        break;
      case 401:
      case 403:
        window.alert("로그인이 필요합니다.")
        window.location.replace("/")
        break;
      default:
        break;
    }
  }catch (e) {
    console.log("Network Error, "+e)
  }
  return res
}
