import { FoodDto } from '../../interface/DataInterface';
import { DBAtom, EditMode } from '../../recoil/DBAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { EditOff } from './isEdit/editOff';
import { EditOn } from './isEdit/editOn';

export const DBBox = () => {
  const [data, setData] = useRecoilState<FoodDto[]>(DBAtom);
  const edit = useRecoilValue(EditMode);

  const handleRemoveFood = (foodIdx: number) => {
    const newData = [...data];
    setData(newData.filter((_, idx) => idx !== foodIdx));
  };

  // 재료 제거 함수

  return (
    <div className="flex justify-center">
      <div className="flex justify-center flex-col w-[70rem] overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-4 py-4">
        <table className="min-w-full text-center text-sm font-light">
          {edit ? <EditOn props={data} onRemoveFood={handleRemoveFood} /> : <EditOff data={data} />}
        </table>
      </div>
    </div>
  );
};
