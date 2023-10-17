import axios, { AxiosInstance } from 'axios';
import { useRecoilValue } from 'recoil';
import { AuthorizedToken } from '../recoil/DBAtom';

export const useAxiosInstance = (): AxiosInstance => {
  const token = useRecoilValue(AuthorizedToken);
  const url = process.env.REACT_APP_SERVER_URL;

  return axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
    },
  });
};
