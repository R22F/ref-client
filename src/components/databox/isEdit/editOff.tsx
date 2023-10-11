import { FoodDto, Ingredient } from '../../../interface/DataInterface';
import { useState } from 'react';

interface EditOffProps {
  data: FoodDto[];
  handleRemoveFood: Function;
}

export const EditOff: React.FC<EditOffProps> = ({ data, handleRemoveFood }) => {
  const [edit, setEdit] = useState(false);
  const console1 = (foodIdx: number) => {
    console.log(data);
    console.log(data[foodIdx]);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };
  return (
    <tbody>
      {data.map((item: FoodDto, foodIdx: number) => {
        return (
          <>
            <tr key={foodIdx} onClick={() => console1(foodIdx)}>
              {/* 요리 정보 출력 */}
              <th scope="col" className=" py-4">
                <button onClick={handleEdit}>레시피 상세보기</button>
              </th>
              <th scope="col" className=" py-4 text-right">
                {item.name}
              </th>
              <th scope="col" className=" py-4 text-right">
                원가 : {item.primePrice.toLocaleString()} 원
              </th>
              <th scope="col" className="py-4 text-right">
                판매가 : {item.fixedPrice.toLocaleString()} 원
              </th>
              <th scope="col" className="py-4 text-right">
                <button onClick={() => handleRemoveFood(item.id)}>레시피 제거</button>
              </th>
            </tr>
            {edit &&
              item.recipes.map((item) => {
                return (
                  <>
                    <tr className="py-4 text-right">
                      <th></th>
                      <th>재료 명</th>
                      <th>재료 량</th>
                      <th>재료 단위</th>
                    </tr>
                    <tr className="py-4 text-right">
                      <th></th>
                      <th className="py-4 text-right">{item.ingredientName}</th>
                      <th>{item.quantity.toLocaleString()}</th>
                      <th>{item.units}</th>
                    </tr>
                  </>
                );
              })}
          </>
        );
      })}
    </tbody>
  );
};
