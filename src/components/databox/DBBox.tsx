import { FoodDto } from '../../interface/DataInterface';
import { DBAtom, EditMode } from '../../recoil/DBAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { EditOff } from './isEdit/editOff';
import { useEffect } from 'react';
import { useAxiosInstance } from '../../Axios/api';

export const DBBox = () => {
  const [data, setData] = useRecoilState<FoodDto[]>(DBAtom);
  const edit = useRecoilValue(EditMode);
  const instance = useAxiosInstance();

  useEffect(() => {}, [data]);

  const handleRemoveFood = async (id: number) => {
    try {
      const response = await instance.delete(`recipe/${id}`);
      console.log(response);
      const newData = [...data];
      setData(newData.filter((item) => item.id !== id));

      alert('삭제되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };

  // 재료 제거 함수

  return (
    <div className="flex justify-center">
      <div className="flex justify-center flex-col w-[70rem] overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-4 py-4">
        <table className="min-w-full text-center text-sm font-light">
          <EditOff data={data} handleRemoveFood={handleRemoveFood} />
        </table>
      </div>
    </div>
  );
};
