import { IngredientInput } from './IngredientInput';
import React, { useState, useEffect } from 'react';

export const IngredientInfo = () => {
  const [ingredients, setIngredients] = useState([{ id: 1, ingredientName: '', quantity: 0, units: 'g' }]);

  const addIngredientInput = () => {
    const newId = ingredients.length + 1;
    setIngredients([...ingredients, { id: newId, ingredientName: '', quantity: 0, units: 'g' }]);
    console.log(ingredients);
  };

  const removeIngredientInput = (id: number) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };
  useEffect(() => {
    console.log(ingredients);
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
          <IngredientInput key={ingredient.id} id={ingredient.id} onRemove={removeIngredientInput} />
        ))}
      </tbody>
    </table>
  );
};
