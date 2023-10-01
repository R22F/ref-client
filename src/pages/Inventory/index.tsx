import axios, { AxiosInstance } from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { InventoryDto } from "../../recoil/DBAtom";
import { IngredientDto } from "../../interface/DataInterface";
import { useState } from "react";

export const Inventory = () => {
  // 요청을 보낼 URL
  const url = "https://server-ref.kro.kr";

  // 토큰 값
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJpZCI6IjIiLCJleHAiOjE2OTYxNzM4NzMsInVzZXJuYW1lIjoic3RyaW5nIn0.FLQm4ROPicGtTP7b1rsMVn6s1mZl9B1JWizT6a5j5ropQb3GncHlA7aOu0abI6qgJlUeAlOZozfjExnFNxJZyQ";
  const [Inv, setInv] = useRecoilState(InventoryDto);
  const parsedDate1: Date = new Date();
  const parsedDate2: Date = new Date();
  // Axios 인스턴스 생성
  const instance: AxiosInstance = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      // GET 요청 예시
      instance
        .get("/inventory/")
        .then((response) => {
          // 응답 처리 로직 작성
          console.log(response.data);
          setInv(response.data);
        })
        .catch((error) => {
          // 에러 처리 로직 작성
          console.error(error);
        });
    };

    fetchData();
  }, []);
  const buttonDesign = () => {
    return "bg-white hover:bg-red-500 hover:border-red-200 hover:text-red-200 text-red-400 font-semibold py-2 px-4 border border-red-400 rounded shadow ml-4";
    //  "bg-red-400 border-red-100 text-red-100 font-semibold py-2 px-4 border rounded shadow ml-4"
  };
  return (
    <div className="flex justify-center flex-col mt-28 items-left ml-[10rem]">
      <div className="w-[100rem] overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-4 py-4">
        <div className="flex items-center ml-[1rem] mb-[1rem]">
          <button id="재료추가" className={buttonDesign()}>
            재료추가
          </button>
        </div>
        <table className="min-w-full text-center text-sm font-light border-t-2 border-black">
          <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
            <tr>
              <th scope="col" className="w-4 px-6 py-4"></th>
              <th scope="col" className=" px-6 py-4 text-right">
                재료명
              </th>
              <th scope="col" className=" px-6 py-4 text-right">
                남은 재고
              </th>
              <th scope="col" className=" px-6 py-4 text-right">
                구매 날짜
              </th>
              <th scope="col" className=" px-6 py-4 text-right mr-4">
                구매 예정 날짜
              </th>
              <th scope="col" className=" px-6 py-4 text-right mr-4">
                재고 경고량
              </th>
              <th scope="col" className=" px-6 py-4 text-right mr-4">
                구매 가격(원가)
              </th>
              <th scope="col" className=" px-6 py-4 text-right mr-4">
                구매 묶음 양
              </th>
              <th scope="col" className=" px-6 py-4 text-right mr-4">
                소비 기한
              </th>
              <th scope="col" className=" px-6 py-4 text-right mr-4">
                이상적인 양
              </th>
              <th scope="col" className=" px-6 py-4 text-right mr-4">
                구매 링크
              </th>
            </tr>
          </thead>
          <tbody>
            {Inv.map((item: IngredientDto, idx: number): any => {
              const expiredDate: Date = new Date(item.expiredDate);
              const buyDate: Date = new Date(item.buyDate);
              // 날짜 차이 계산 (밀리초 단위)
              const timeDiff: number =
                expiredDate.getTime() - buyDate.getTime();

              // 일 단위로 변환
              const dayDiff: number = timeDiff / (1000 * 3600 * 24);
              return (
                <tr className="border-b dark:border-neutral-500">
                  <td>{idx + 1}</td>
                  <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">
                    {item.name}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-right">
                    {item.remainQuantity} {item.units.toString()}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-right">
                    {item.buyDate}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-right">
                    {dayDiff}일
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-right">
                    {item.alertQuantity}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-right">
                    {item.primePrice}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-right">
                    {item.relievedQuantity}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-right">
                    {item.expiredDate}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-right">
                    {"1회 구매 량"}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-right">
                    {item.url}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
