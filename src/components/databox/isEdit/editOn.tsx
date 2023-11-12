import {useRecoilState} from 'recoil';
import {FoodDto, Ingredient} from '../../../interface/DataInterface';
import {DBAtom} from '../../../recoil/DBAtom';
import {useState} from 'react';

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

  console.log(ingredientNames);
  console.log(quantities);

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
    setData((prevData) => {
      const newData = [...prevData];

      newData[foodIdx] = {
        ...newData[foodIdx],
        recipes: [...newData[foodIdx].recipes, { id: 0, quantity: 0, ingredientName: '', units: 'g' }],
      };

      return newData;
    });
    console.log('newdata', data, 'length', data.length);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, foodIdx: number, ingredientIdx: number) => {
    const { id, value } = e.target;

    setData((prevData) => {
      const newData = prevData.map((food) => ({ ...food }));
      newData[foodIdx] = {
        ...newData[foodIdx],
        recipes: newData[foodIdx].recipes.map((ingredient) => ({ ...ingredient })),
      };

      switch (id) {
        case 'name':
          newData[foodIdx].recipes[ingredientIdx].ingredientName = value;
          break;
        case 'quantity':
          newData[foodIdx].recipes[ingredientIdx].quantity = Number(value);
          break;
        default:
          break;
      }

      return newData;
    });
    console.log(data);
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
                  
                  <td className="py-1 text-right">
                    <input
                      type="text"
                      placeholder={`${ingredient.ingredientName}`}
                      id="name"
                      onChange={(e) => handleChange(e, foodIdx, ingredientIdx)}
                    ></input>
                  </td>
                  <td className="py-1 text-right">
                    <input
                      type="text"
                      placeholder={`${ingredient.quantity} `}
                      id="quantity"
                      onChange={(e) => handleChange(e, foodIdx, ingredientIdx)}
                    ></input>
                    {ingredient.units}
                  </td>
                  
                  <td className="py-1 text-right"></td>
                  <td></td>
                  <td className="py-1 text-right">
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
