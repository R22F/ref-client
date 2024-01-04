import {IngredientInput} from "./IngredientInput";
import React, {useEffect} from "react";
import './index.css'

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
export const IngredientInfo = ({
  ingredients,
  setIngredients,
}: {
  ingredients: recipe[];
  setIngredients: Function;
}) => {
  const addIngredientInput = () => {
    const newId = ingredients[ingredients.length - 1].id + 1;
    setIngredients([
      ...ingredients,
      {
        id: newId,
        ingredientName: { name: "", ingredientId: 0 },
        quantity: 0,
        units: "g",
      },
    ]);
  };

  const removeIngredientInput = (id: number) => {
    if(ingredients.length > 1)
      setIngredients(ingredients.filter((ingredient) => ingredient.id !== id))
  };
  useEffect(() => {}, [ingredients]);
  return (
    <table className='ingredient-table'>
      <thead>
        <tr>
          <th scope="col" className='ingredient-info-column'>재료 명</th>
          <th scope="col" className='ingredient-info-column'>재료 량</th>
          <th scope="col" className='ingredient-info-column'>
            <button className='ingredient-add-button' onClick={addIngredientInput}>재료 추가</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {ingredients.map((ingredient) => (
          <IngredientInput
            key={ingredient.id}
            id={ingredient.id}
            onRemove={removeIngredientInput}
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
        ))}
      </tbody>
    </table>
  );
};
