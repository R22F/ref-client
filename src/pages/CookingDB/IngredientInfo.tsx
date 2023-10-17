import { IngredientInput } from './IngredientInput';
import React, { useState, useEffect } from 'react';

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
      { id: newId, ingredientName: { name: '', ingredientId: 0 }, quantity: 0, units: 'g' },
    ]);
  };

  const removeIngredientInput = (id: number) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };
  useEffect(() => {
  }, [ingredients]);
  return (
    <table className="min-w-full text-center text-sm font-light border-t-2 border-black bg-white">
      <thead>
        <tr>
          <th scope="col" className="px-2 py-4 text-center">
            재료 명
          </th>
          <th scope="col" className="px-2 py-4 text-center">
            재료 량
          </th>
          <th scope="col" className="px-2 py-4 text-center">
            단위
          </th>
          <th scope="col" className="px-2 py-4 text-center">
            <button onClick={addIngredientInput}>재료 추가</button>
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
