import axios, { AxiosInstance } from "axios";

export const addIngredient = (add: boolean, setAdd: Function) => {
  // 요청을 보낼 URL
  const url = "https://server-ref.kro.kr";

  // 토큰 값
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJpZCI6IjIiLCJleHAiOjE2OTYyMTgxNzMsInVzZXJuYW1lIjoic3RyaW5nIn0.e25j6RwehGzfwnQdHy2H7d_5WayW8nlkTF2DoXW4MLkX_0U4FHINQOwibYVVeBYjliqRIeIm5vbuj4pbWQKLQA";

  // Axios 인스턴스 생성
  const instance: AxiosInstance = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
    },
  });

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       // GET 요청 예시
  //       instance
  //         .get("/inventory/")
  //         .then((response) => {
  //           // 응답 처리 로직 작성
  //           console.log(response.data);
  //           setInv(response.data);
  //         })
  //         .catch((error) => {
  //           // 에러 처리 로직 작성
  //           console.error(error);
  //         });
  //     };

  //     fetchData();
  //   }, []);

  const modalblur = () => {
    return add
      ? "fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"
      : "";
  };
  const inputcss = () => {
    return " px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-300 focus:border-2 ";
  };

  const buttonDesign = () => {
    return "bg-white hover:bg-red-500 hover:border-red-200 hover:text-red-200 text-red-400 font-semibold py-2 px-4 border border-red-400 rounded shadow whitespace-nowrap text-right";
    //  "bg-red-400 border-red-100 text-red-100 font-semibold py-2 px-4 border rounded shadow ml-4"
  };
  const eraseButtonDesign = () => {
    return "bg-white hover:bg-gray-400 hover:border-gray-100 hover:text-gray-100 text-gray-400 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-auto whitespace-nowrap text-right";
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={modalblur()}>
      <div className="flex justify-center flex-col mt-[20rem] items-left ml-[10rem]">
        <div className="w-full overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-4 py-4 bg-white">
          <table className="min-w-full text-center text-sm font-light border-t-2 border-black bg-white">
            <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800 ">
              <tr>
                <th scope="col" className=" px-6 py-4 text-right mr-4"></th>
                <th scope="col" className=" px-6 py-4 text-right mr-4"></th>
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
  );
};
