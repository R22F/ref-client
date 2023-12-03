import {checkTokenValidate, useAxiosInstance} from "../../../Axios/api";
import {FoodDto} from "../../../interface/DataInterface";
import React, {useState} from "react";
import {DBAtom, isLoginModalOpen} from "../../../recoil/DBAtom";
import {useRecoilState} from "recoil";

interface EditOffProps {
  handleRemoveFood: Function;
}

export const EditOff: React.FC<EditOffProps> = ({ handleRemoveFood }) => {
  const [data, setData] = useRecoilState<FoodDto[]>(DBAtom);
  const [edit, setEdit] = useState(false);
  const [, setIsLoginModalOpen] = useRecoilState(isLoginModalOpen)

  const instance = useAxiosInstance();
  const buttonDesign = () => {
    return "bg-white hover:bg-red-500 hover:border-red-200 hover:text-red-200 text-red-400 font-semibold py-2 px-2 border border-red-400 rounded shadow whitespace-nowrap text-right";
    //  "bg-red-400 border-red-100 text-red-100 font-semibold py-2 px-4 border rounded shadow ml-4"
  };
  const eraseButtonDesign = () => {
    return "bg-white hover:bg-gray-400 hover:border-gray-100 hover:text-gray-100 text-gray-400 font-semibold py-2 px-4 border border-gray-400 rounded mr-2 shadow whitespace-nowrap text-right";
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleRemoveIngredient = async (id: number) => {
    try {
      await instance.delete(`recipe/${id}`);
      alert("재료가 제거되었습니다.");
      const response = await instance.get("food/recipes");
      setData(response.data);
    } catch (error) {
      checkTokenValidate(error, setIsLoginModalOpen)
    }
  };
  return (
    <table className="min-w-full text-center text-sm font-light border-t-2 border-black">
      <thead className="whitespace-nowrap border-b bg-neutral-50 dark:border-neutral-500 dark:text-neutral-800">
        <tr>
          <th scope="col" className=" px-6 py-4 text-right mr-4"></th>
          <th scope="col" className=" px-6 py-4 text-right">
            음식명
          </th>
          <th scope="col" className=" px-6 py-4 text-right">
            원가
          </th>
          <th scope="col" className=" px-6 py-4 text-right">
            판매가
          </th>
          <th scope="col" className=" px-6 py-4 text-right mr-4"></th>
        </tr>
      </thead>
        {data.map((item: FoodDto, foodIdx: number) => {
          return (
            <tbody key={foodIdx}>
              <tr
                className="border-t dark:border-neutral-500 bg-gray-100 font-normal"
              >
                <th scope="col" className=" py-4">
                  <button className={buttonDesign()} onClick={handleEdit}>
                    레시피 상세보기
                  </button>
                </th>
                <th scope="col" className=" py-4 text-right">
                  {item.name}
                </th>
                <th scope="col" className=" py-4 text-right">
                  {item.primePrice.toLocaleString()} 원
                </th>
                <th scope="col" className="py-4 text-right">
                  {item.fixedPrice.toLocaleString()} 원
                </th>
                <th scope="col" className="py-4 text-right">
                  <button
                    className={eraseButtonDesign()}
                    onClick={() => handleRemoveFood(item.id)}
                  >
                    요리 제거
                  </button>
                </th>
              </tr>
              {edit && item.recipes[0] && (
                <tr className="  border-gray-400 border-y text-right ">
                  <th></th>
                  <th className="py-2">재료 명</th>
                  <th>재료 량</th>
                  <th>재료 단위</th>
                  <th></th>
                </tr>
              )}
              {edit &&
                item.recipes.map((item) => {
                  return (
                    <>
                      <tr className="py-4 text-right">
                        <th></th>
                        <th className="py-4 text-right">
                          {item.ingredientName}
                        </th>
                        <th>{item.quantity.toLocaleString()}</th>
                        <th>{item.units}</th>
                        <th>
                          <button
                            className={eraseButtonDesign()}
                            onClick={() => handleRemoveIngredient(item.id)}
                          >
                            재료 제거
                          </button>
                        </th>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          );
        })}
    </table>
  );
};
