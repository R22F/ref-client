import { useRecoilState } from 'recoil';
import { FoodDto, Ingredient } from '../../../interface/DataInterface';
import { DBAtom } from '../../../recoil/DBAtom';
import { useState } from 'react';

interface EditOnProps {
  props: FoodDto[];
  onRemoveFood: (foodIdx: number) => void;
}

export const EditOn: React.FC<EditOnProps> = ({ props, onRemoveFood }) => {
  const [data, setData] = useRecoilState<FoodDto[]>(DBAtom);

  // 각각의 입력 필드에 대한 상태
  const [ingredientNames, setIngredientNames] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);

  const handleRemoveFood = (foodIdx: number) => {
    onRemoveFood(foodIdx);
  };
  

  const handleRemoveIngredient = (foodIndex: number, ingredientIndex: number) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[foodIndex] = {
        ...newData[foodIndex],
        recipes: [...newData[foodIndex].recipes],
      };

      newData[foodIndex].recipes.splice(ingredientIndex, 1);
      return newData;
    });
  };

  const handleProduceIngredient = (foodIdx: number) => {
    const ingredientName = ingredientNames[foodIdx];
    const quantity = quantities[foodIdx];

    setData((prevData) => {
      const newData = [...prevData];
      newData[foodIdx] = {
        ...newData[foodIdx],
        recipes: [
          ...newData[foodIdx].recipes,
          { id: prevData[foodIdx].recipes.length + 1, quantity, ingredientName, units: 'g' },
        ],
      };

      return newData;
    });

    // 추가 후 입력값 초기화
    setIngredientNames((prevNames) => {
      const newNames = [...prevNames];
      newNames[foodIdx] = '';
      return newNames;
    });

    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[foodIdx] = 0;
      return newQuantities;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, foodIdx: number) => {
    const { id, value } = e.target;
    switch (id) {
      case 'name':
        setIngredientNames((prevNames) => {
          const newNames = [...prevNames];
          newNames[foodIdx] = value;
          return newNames;
        });
        break;
      case 'quantity':
        setQuantities((prevQuantities) => {
          const newQuantities = [...prevQuantities];
          newQuantities[foodIdx] = Number(value);
          return newQuantities;
        });
        break;
      default:
        break;
    }
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
                <button onClick={() => handleProduceIngredient(foodIdx)}>재료 추가</button>
              </th>
            </tr>
            {item.recipes.map((ingredient: Ingredient, ingredientIdx: number) => {
              return (
                <tr key={ingredientIdx}>
                  {/* 재료 정보 출력 */}
                  <td className="py-1 text-right">
                    <input
                      type="text"
                      placeholder={`${ingredient.ingredientName}`}
                      id="name"
                      onChange={(e) => handleChange(e, foodIdx)}
                    ></input>
                  </td>
                  <td className="py-1 text-right">
                    <input
                      type="text"
                      placeholder={`${ingredient.quantity} `}
                      id="quantity"
                      onChange={(e) => handleChange(e, foodIdx)}
                    ></input>{' '}
                    {ingredient.units}
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
