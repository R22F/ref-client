import { useRecoilValue } from 'recoil';
import { Options } from '../../recoil/DBAtom';

interface ingredientData {
  name: string;
  ingredientId: number;
}
interface recipe {
  id: number;
  ingredientName: ingredientData;
  quantity: number;
  units: string | undefined;
}

type IngredientInputProps = {
  id: number; // id 속성을 명시적으로 정의
  onRemove: (id: number) => void;
  ingredients: recipe[];
  setIngredients: Function;
};
const options = ['g', 'ea'];

export const IngredientInput: React.FC<IngredientInputProps> = ({ id, onRemove, ingredients, setIngredients }) => {
  const ingredientOptions = useRecoilValue<Map<string, number>>(Options);
  const ingredientsOption = ['재료', ...Array.from(ingredientOptions.keys())];
  const inputcss = () => {
    return ' px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-300 focus:border-2 ';
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'name':
        ingredients[id - 1].ingredientName.name = e.target.value;
        ingredients[id - 1].ingredientName.ingredientId = Number(ingredientOptions.get(e.target.value));
        break;
      case 'quantity':
        ingredients[id - 1].quantity = Number(e.target.value);
        break;
      case 'units':
        ingredients[id - 1].units = e.target.value;
        break;
    }
  };
  return (
    <tr key={id}>
      <th className="whitespace-nowrap  px-6 py-4 font-medium text-center">
        <select id="name" className={inputcss()} onChange={handleChange}>
          {ingredientsOption.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </th>
      <th className="whitespace-nowrap  px-6 py-4 font-medium text-center">
        <input type="text" id="quantity" className={inputcss()} onChange={handleChange} />
      </th>
      <th className="whitespace-nowrap  px-6 py-4 font-medium text-center">
        <select id="units" className={inputcss()} onChange={handleChange}>
          {options.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </th>
      <th className="whitespace-nowrap  px-6 py-4 font-medium text-center">
        <button onClick={() => onRemove(id)}>재료 제거</button>
      </th>
    </tr>
  );
};
