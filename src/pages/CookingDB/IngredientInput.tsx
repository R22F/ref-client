import {useRecoilValue} from "recoil";
import {Options} from "../../recoil/DBAtom";
import './index.css'
import React from "react";

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
  id: number;
  onRemove: (id: number) => void;
  ingredients: recipe[];
  setIngredients: Function;
};

export const IngredientInput: React.FC<IngredientInputProps> = ({
  id,
  onRemove,
  ingredients
}) => {
  const ingredientOptions = useRecoilValue<Map<string, number>>(Options);
  const ingredientsOption = ["재료", ...Array.from(ingredientOptions.keys())];

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    switch (e.target.id) {
      case "name":
        ingredients[id - 1].ingredientName.name = e.target.value;
        ingredients[id - 1].ingredientName.ingredientId = Number(
          ingredientOptions.get(e.target.value)
        );
        break;
      case "quantity":
        ingredients[id - 1].quantity = Number(e.target.value);
        break;
      case "units":
        ingredients[id - 1].units = e.target.value;
        break;
    }
  };
  return (
    <tr key={id} className='ingredient-edit-table'>
      <th className='ingredient-table-header'>
        <select id="name" className='ingredient-info-input' onChange={handleChange}>
          {ingredientsOption.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </th>
      <th className='ingredient-table-header'>
        <input
          type="text"
          id="quantity"
          className='ingredient-info-input'
          onChange={handleChange}
        />
      </th>
      <th className='ingredient-table-header'>
        <button className='ingredient-erase-button' onClick={() => onRemove(id)}>
          재료 제거
        </button>
      </th>
    </tr>
  );
};
