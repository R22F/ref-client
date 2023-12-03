import {FoodDto} from "../../interface/DataInterface";
import {DBAtom, EditMode, isLoginModalOpen} from "../../recoil/DBAtom";
import {useRecoilState, useRecoilValue} from "recoil";
import {EditOff} from "./isEdit/editOff";
import {useEffect} from "react";
import {checkTokenValidate, useAxiosInstance} from "../../Axios/api";

export const DBBox = ({ setAdd }: { setAdd: Function }) => {
  const [data, setData] = useRecoilState<FoodDto[]>(DBAtom);
  const [, setIsLoginModalOpen] = useRecoilState(isLoginModalOpen)

  const instance = useAxiosInstance();

  useEffect(() => {}, [data]);

  const handleRemoveFood = async (id: number) => {
    try {
      const response = await instance.delete(`food/${id}/recipes`);
      const newData = [...data];
      setData(newData.filter((item) => item.id !== id));

      alert("삭제되었습니다.");
    } catch (error) {
      checkTokenValidate(error, setIsLoginModalOpen)
      console.log(error);
    }
  };
  const buttonDesign = () => {
    return "bg-white hover:bg-red-500 hover:border-red-200 hover:text-red-200 text-red-400 font-semibold py-2 px-4 mb-2 border border-red-400 rounded shadow whitespace-nowrap text-right";
    //  "bg-red-400 border-red-100 text-red-100 font-semibold py-2 px-4 border rounded shadow ml-4"
  };

  // 재료 제거 함수

  return (
    <div className="flex justify-center flex-col my-16   items-left ml-[10rem] ">
      <div className="w-full overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-4 py-4 mr-[10rem]">
        <button className={buttonDesign()} onClick={() => setAdd(true)}>
          요리 추가 +
        </button>
        <EditOff handleRemoveFood={handleRemoveFood} />
      </div>
    </div>
  );
};
