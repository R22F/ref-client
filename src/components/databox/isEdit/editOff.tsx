import { FoodDto, Ingredient } from '../../../interface/DataInterface';

interface EditOffProps {
  data: FoodDto[];
}

export const EditOff: React.FC<EditOffProps> = ({ data }) => {
  return (
    <tbody>
      {data.map((item: FoodDto, foodIdx: number) => {
        return (
          <>
            <tr key={foodIdx}>
              {/* 요리 정보 출력 */}
              <th scope="col" className=" py-4 text-right">
                {item.name}
              </th>
              <th scope="col" className=" py-4 text-right">
                원가 : {item.primePrice.toLocaleString()} 원
              </th>
              <th scope="col" className="py-4 text-right">
                판매가 : {item.fixedPrice.toLocaleString()} 원
              </th>
              <th className="py-4 text-right">
                <button>요리 제거</button>
              </th>
              <th className="py-4 text-right">
                <button>재료 추가</button>
              </th>
            </tr>
            {item.recipes.map((ingredient: Ingredient, ingredientIdx: number) => {
              return (
                <tr key={ingredientIdx}>
                  {/* 재료 정보 출력 */}
                  <td className="py-1 text-right">{ingredient.ingredientName}</td>
                  <td className="py-1 text-right">
                    {ingredient.quantity} {ingredient.units}
                  </td>
                  {/* 삭제 버튼 */}
                  <td className="py-1 text-right"></td>
                  <td></td>
                  <td className="py-1 text-right"></td>
                </tr>
              );
            })}
          </>
        );
      })}
    </tbody>
  );
};
