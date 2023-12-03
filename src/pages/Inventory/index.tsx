import {AxiosInstance} from "axios";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {InventoryDto, isLoginModalOpen} from "../../recoil/DBAtom";
import {IngredientDto} from "../../interface/DataInterface";
import {AddIngredient} from "./addIngredient";
import {ModifyIngredient} from "./ModifyIngredient";
import {checkTokenValidate, useAxiosInstance} from "../../Axios/api";

export const Inventory = () => {
  // 요청을 보낼 URL
  const [add, setAdd] = useState(false);
  const [mod, setMod] = useState(false);
  // const [modidx, setModIdx] = useState(0);
  const instance: AxiosInstance = useAxiosInstance();
  const [, setIsLoginModalOpen] = useRecoilState(isLoginModalOpen)


  const isaddIngredient = () => {
    setAdd(true);
  };

  const [ingredient, SetIngredient] = useState<IngredientDto | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      // GET 요청 예시
      instance
        .get("/inventory/")
        .then((response) => {
          // 응답 처리 로직 작성
          if (response.data === "") {
            console.log(response);
          } else {
            setInv(response.data);
          }
        })
        .catch((error) => {
          checkTokenValidate(error, setIsLoginModalOpen)
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [add]);

  const eraseIngreData = (idx: number) => {
    instance
      .delete(`/inventory/${idx}`)
      .then(() => {
        alert("재료를 삭제했습니다.");
        // 화면 갱신 로직 작성
        instance
          .get("/inventory/")
          .then((response) => {
            // 응답 처리 로직 작성

            setInv(response.data);
          })
          .catch((error) => {
            checkTokenValidate(error, setIsLoginModalOpen)
          });
      })
      .catch((error) => {
        checkTokenValidate(error, setIsLoginModalOpen)
        alert("요리 레시피에서 사용하는 재료가 없어야만 삭제가 가능합니다.");
        // 오류 처리 로직 작성
      });
  };

  const [Inv, setInv] = useRecoilState(InventoryDto);
  const buttonDesign = () => {
    return "bg-white hover:bg-red-500 hover:border-red-200 hover:text-red-200 text-red-400 font-semibold py-2 px-4 border border-red-400 rounded shadow whitespace-nowrap text-right";
    //  "bg-red-400 border-red-100 text-red-100 font-semibold py-2 px-4 border rounded shadow ml-4"
  };
  const eraseButtonDesign = () => {
    return "bg-white hover:bg-gray-400 hover:border-gray-100 hover:text-gray-100 text-gray-400 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-auto whitespace-nowrap text-right";
  };

  return (
    <div className="flex justify-center flex-col mt-28 items-left ml-[10rem] ">
      <div className="w-full overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-4 py-4 mr-[10rem]">
        {/* 재료 추가버튼 클릭시 뜨는 모달 컴포넌트 */}
        {add && <AddIngredient add={add} setAdd={setAdd} setInv={setInv} />}
        {mod && (
          <ModifyIngredient
            mod={mod}
            setMod={setMod}
            setInv={setInv}
            ingredient={ingredient}
          />
        )}
        <div className="flex items-center ml-[1rem] mb-[1rem]">
          <button
            id="재료추가"
            className={buttonDesign()}
            onClick={isaddIngredient}
          >
            재료추가
          </button>
        </div>
        <table className="min-w-full text-center text-sm font-light border-t-2 border-black">
          <thead className="whitespace-nowrap border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
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
                <tr
                  key={idx.toString()}
                  className="border-b dark:border-neutral-500"
                >
                  <td>
                    <button
                      className={eraseButtonDesign()}
                      onClick={() => {
                        if (window.confirm("정말로 삭제 하시겠습니까?"))
                          eraseIngreData(item.id);
                      }}
                    >
                      제거
                    </button>
                  </td>
                  <td>
                    <button
                      className={buttonDesign()}
                      onClick={() => {
                        setMod(true);
                        SetIngredient(item);
                      }}
                    >
                      수정
                    </button>
                  </td>
                  <td>{idx + 1}</td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-right">
                    {item.name}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-right">
                    {item.remainQuantity} {item.units.toString()}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-right">
                    {item.buyDate}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-right">
                    {dayDiff}일 {/*expiredDate - buyDate*/}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-right">
                    {item.alertQuantity} {item.units.toString()}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-right">
                    {item.primePrice}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-right">
                    {/* buy quantity */}
                    {"1회 구매 량"} {item.units.toString()}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-right">
                    {item.expiredDate}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-right">
                    {item.relievedQuantity}
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
