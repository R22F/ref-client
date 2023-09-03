import { useRecoilValue } from 'recoil';
import { DBAtom } from '../../recoil/DBAtom';

export const IngredientBox = () => {
  const foodList = useRecoilValue(DBAtom);
  const editMode = false;

  return (
    <tr className="border-[1px]">
      {editMode ? <input type="text" className="ml-12 w-28" placeholder="재료이름"></input> : <td className="ml-12 w-28">name</td>}
      {editMode ? <input type="number" className="w-28" placeholder="들어가는 양"></input> : <td className="w-28">quantity</td>}
      {editMode ? <input type="text" className="w-28" placeholder="g/ea"></input> : <td className="w-28">unit</td>}
      <button className="pr-4">재료 제거 -</button>
    </tr>
  );
};
