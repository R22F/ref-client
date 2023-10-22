import { IngredientInput } from "./IngredientInput";
import React, { useState, useEffect } from "react";

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

  const buttonDesign = () => {
    return "bg-white hover:bg-red-500 hover:border-red-200 hover:text-red-200 text-red-400 font-semibold py-2 px-4 border border-red-400 rounded shadow whitespace-nowrap text-right";
    //  "bg-red-400 border-red-100 text-red-100 font-semibold py-2 px-4 border rounded shadow ml-4"
  };
  const removeIngredientInput = (id: number) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };
  useEffect(() => {}, [ingredients]);
  return (
    <table className="min-w-full text-center text-sm font-light border-b-[1px] border-black bg-white mb-2">
      <thead>
        <tr>
          <th scope="col" className="px-2 py-4 text-center">
            재료 명
          </th>
          <th scope="col" className="px-2 py-4 text-center">
            재료 량
          </th>
          <th scope="col" className="px-2 py-4 text-center">
            <button className={buttonDesign()} onClick={addIngredientInput}>
              재료 추가
            </button>
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
