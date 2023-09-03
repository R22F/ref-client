import { useRecoilState } from 'recoil';
import { FoodDto, Ingredient } from '../../../interface/DataInterface';
import { DBAtom } from '../../../recoil/DBAtom';

interface EditOnProps {
  props: FoodDto[];
  onRemoveFood: (foodIdx: number) => void;
}

export const EditOn: React.FC<EditOnProps> = ({ props, onRemoveFood }) => {
  const [data, setData] = useRecoilState<FoodDto[]>(DBAtom);
  const handleRemoveFood = (foodIdx: number) => {
    // 요리를 삭제하고 싶은 경우 해당 요리의 인덱스를 사용하여 onRemoveFood 콜백을 호출합니다.
    onRemoveFood(foodIdx);
  };

  const handleRemoveIngredient = (foodIndex: number, ingredientIndex: number) => {
    setData((prevData) => {
      const newData = [...prevData]; // 이전 배열을 복사하여 새로운 배열 생성
      newData[foodIndex] = {
        ...newData[foodIndex], // 해당 요리 항목을 복사하여 새로운 객체 생성
        recipes: [...newData[foodIndex].recipes], // 해당 요리의 레시피 배열을 복사하여 새로운 배열 생성
      };

      newData[foodIndex].recipes.splice(ingredientIndex, 1); // 해당 인덱스의 재료 삭제
      return newData;
    });
  };
  return (
    <tbody>
      {props.map((item: FoodDto, foodIdx: number) => {
        return (
          <>
            <tr key={foodIdx}>
              {/* 요리 정보 출력 */}
              <th scope="col" className=" py-4 text-right">
                <input type="text" placeholder={`${item.name}`}></input>
              </th>
              <th scope="col" className=" py-4 text-right">
                <input type="text" placeholder={`원가 : ${item.primePrice.toLocaleString()} 원`}></input>
              </th>
              <th scope="col" className="py-4 text-right">
                <input type="text" placeholder={`판매가 : ${item.fixedPrice.toLocaleString()} 원`}></input>
              </th>
              <th className="py-4 text-right">
                <button onClick={() => handleRemoveFood(foodIdx)}>요리 제거</button>
              </th>
              <th className="py-4 text-right">
                <button>재료 추가</button>
              </th>
            </tr>
            {item.recipes.map((ingredient: Ingredient, ingredientIdx: number) => {
              return (
                <tr key={ingredientIdx}>
                  {/* 재료 정보 출력 */}
                  <td className="py-1 text-right">
                    <input type="text" placeholder={`${ingredient.ingredientName}`}></input>
                  </td>
                  <td className="py-1 text-right">
                    <input type="text" placeholder={`${ingredient.quantity} `}></input> {ingredient.units}
                  </td>
                  {/* 삭제 버튼 */}
                  <td className="py-1 text-right"></td>
                  <td></td>
                  <td className="py-1 text-right">
                    {' '}
                    <button onClick={() => handleRemoveIngredient(foodIdx, ingredientIdx)}>재료제거</button>
                  </td>
                </tr>
              );
            })}
          </>
        );
      })}
    </tbody>
  );
};
