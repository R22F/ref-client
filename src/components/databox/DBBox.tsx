import {FoodDto} from "../../interface/DataInterface";
import {DBAtom, isLoginModalOpen} from "../../recoil/DBAtom";
import {useRecoilState} from "recoil";
import {EditOff} from "./isEdit/editOff";
import {useEffect} from "react";
import {checkTokenValidate, useAxiosInstance} from "../../Axios/api";

export const DBBox = ({ setAdd }: { setAdd: Function }) => {
  const [data, setData] = useRecoilState<FoodDto[]>(DBAtom);
  const [, setIsLoginModalOpen] = useRecoilState(isLoginModalOpen)

  const instance = useAxiosInstance();

  useEffect(() => {}, [data]);

  const handleRemoveFood = async (id: number, name:string) => {
    try {
      if (!window.confirm(`${name}을(를) 삭제 하시겠습니까?`)) return
      await instance.delete(`food/${id}/recipes`);
      const newData = [...data];
      setData(newData.filter((item) => item.id !== id));
      alert("삭제되었습니다.");
    } catch (error) {
      checkTokenValidate(error, setIsLoginModalOpen)
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center flex-col mt-12 items-center">
      <div
          className="flex justify-center flex-col w-[60rem] sm:-mx-6 lg:-mx-6 border-4 rounded-md px-4 py-4">
        <button
            className="bg-white hover:bg-red-500 hover:border-red-200 hover:text-red-200 text-red-400 font-semibold py-2 px-4 mb-2 border border-red-400 rounded shadow whitespace-nowrap w-fit"
            onClick={() => setAdd(true)}>
          요리 추가 +
        </button>
        <EditOff handleRemoveFood={handleRemoveFood} />
      </div>
    </div>
  );
};
