import {useRecoilValue} from 'recoil';
import {DBAtom} from '../../recoil/DBAtom';

export const IngredientBox = ({ ingredientId, onRemove, editMode }: any) => {
  const foodList = useRecoilValue(DBAtom);

  const handleRemoveClick = () => {
    onRemove(ingredientId);
  };

  return (
    <div className="flex justify-center ">
      <div className="w-[55rem] border-[1px] h-8 border-black flex justify-between">
        {editMode ? (
          <input type="text" className="ml-12 w-28" placeholder="재료이름"></input>
        ) : (
          <div className="ml-12 w-28">name</div>
        )}
        {editMode ? (
          <input type="number" className="w-28" placeholder="들어가는 양"></input>
        ) : (
          <span className="w-28">quantity</span>
        )}
        {editMode ? (
          <input type="text" className="w-28" placeholder="g/ea"></input>
        ) : (
          <span className="w-28">unit</span>
        )}
        <button onClick={handleRemoveClick} className="pr-4">
          재료 제거 -
        </button>
      </div>
    </div>
  );
};
