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
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJpZCI6IjIiLCJleHAiOjE2OTYxNzg4MTIsInVzZXJuYW1lIjoic3RyaW5nIn0.OJs9xlIbgKoa0T7Rs09vbOS3NrRW_ejUcyzkXqHyY264OUCOIZ8j_nFlqqa4FX87J3rmfPpon8JLzA7gWj9jzg";
  const [Inv, setInv] = useRecoilState(InventoryDto);
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
    return "bg-white hover:bg-red-500 hover:border-red-200 hover:text-red-200 text-red-400 font-semibold py-2 px-4 border border-red-400 rounded shadow whitespace-nowrap text-right";
    //  "bg-red-400 border-red-100 text-red-100 font-semibold py-2 px-4 border rounded shadow ml-4"
  };
  const eraseButtonDesign = () => {
    return "bg-white hover:bg-gray-400 hover:border-gray-100 hover:text-gray-100 text-gray-400 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-auto whitespace-nowrap text-right";
  };

  const [add, setAdd] = useState(false);
  const addIngredient = () => {
    setAdd(!add);
    console.log(add);
  };
  const modalblur = () => {
    return add
      ? "fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"
      : "";
  };
  const inputcss = () => {
    return " px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-300 focus:border-2 ";
  };
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex justify-center flex-col mt-28 items-left ml-[10rem]">
      <div className="w-[100rem] overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-4 py-4">
        {add && (
          <div className={modalblur()}>
            <div className="flex justify-center flex-col mt-[20rem] items-left ml-[10rem]">
              <div className="w-[100rem] overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-4 py-4 bg-white">
                <table className="min-w-full text-center text-sm font-light border-t-2 border-black bg-white">
                  <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800 ">
                    <tr>
                      <th
                        scope="col"
                        className=" px-6 py-4 text-right mr-4"
                      ></th>
                      <th
                        scope="col"
                        className=" px-6 py-4 text-right mr-4"
                      ></th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-6 py-4 text-right"
                      >
                        재료명
                      </th>
                      <th scope="col" className=" px-6 py-4 text-right">
                        남은 재고
                      </th>
                      <th scope="col" className=" px-6 py-4 text-right">
                        단위
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
                    <tr className="border-b dark:border-neutral-500">
                      <td>
                        <button
                          className={eraseButtonDesign()}
                          onClick={() => {
                            setAdd(false);
                          }}
                        >
                          취소
                        </button>
                      </td>
                      <td>
                        <button className={buttonDesign()}>저장</button>
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">
                        <input
                          type="text"
                          onChange={() => {
                            console.log("text");
                          }}
                          className={inputcss()}
                        />
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4 text-right">
                        <input
                          type="number"
                          onChange={() => {
                            console.log("remainQuantity");
                          }}
                          className={inputcss()}
                        />
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4 text-right">
                        <select className={inputcss()}>
                          <option value="g">g</option>
                          <option value="ea">ea</option>
                        </select>
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4 text-right">
                        <input
                          type="date"
                          className={inputcss()}
                          defaultValue={today}
                        />
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4 text-right">
                        <input
                          type="date"
                          className={inputcss()}
                          defaultValue={today}
                        />
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4 text-right">
                        <input
                          type="number"
                          onChange={() => {
                            console.log("alertquantity");
                          }}
                          className={inputcss()}
                        />
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4 text-right">
                        <input
                          type="number"
                          onChange={() => {
                            console.log("alertquantity");
                          }}
                          className={inputcss()}
                        />
                        원
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4 text-right">
                        <input
                          type="number"
                          onChange={() => {
                            console.log("buyquantity");
                          }}
                          className={inputcss()}
                        />
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4 text-right">
                        <input
                          type="number"
                          onChange={() => {
                            console.log("alertquantity");
                          }}
                          className={inputcss()}
                        />
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4 text-right">
                        <input
                          type="number"
                          onChange={() => {
                            console.log("alertquantity");
                          }}
                          className={inputcss()}
                        />
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4 text-right">
                        <input
                          type="text"
                          onChange={() => {
                            console.log("text");
                          }}
                          className={inputcss()}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center ml-[1rem] mb-[1rem]">
          <button
            id="재료추가"
            className={buttonDesign()}
            onClick={addIngredient}
          >
            재료추가
          </button>
        </div>
        <table className="min-w-full text-center text-sm font-light border-t-2 border-black">
          <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
            <tr>
              <th scope="col" className=" px-6 py-4 text-right mr-4"></th>
              <th scope="col" className=" px-6 py-4 text-right mr-4"></th>
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
                  <td>
                    <button className={eraseButtonDesign()}>제거</button>
                  </td>
                  <td>
                    <button className={buttonDesign()}>수정</button>
                  </td>
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
