import { useState } from 'react';
import { IngredientBox } from './IngredientBox';
import { useRecoilValue } from 'recoil';
import { DBAtom } from '../../recoil/DBAtom';
import { FoodDto } from '../../interface/DataInterface';

interface DBBoxProps {
  editMode: boolean;
}

export const DBBox: React.FC<DBBoxProps> = ({ editMode }) => {
  const foodList = useRecoilValue(DBAtom);

  const [ingredient, setIngredient] = useState<FoodDto[]>(foodList || []);

  const handleAddIngredient = () => {
    const newIngredient = {
      id: ingredient.length + 1,
      name: `재료${ingredient.length + 1}`,
      fixedPrice: 0,
      primePrice: 0,
      ingredients: [],
    };
    setIngredient((prevIngredients) => [...prevIngredients, newIngredient]);
  };

  const handleRemoveIngredient = (id: number) => {
    setIngredient((prevIngredients) => prevIngredients.filter((ingredient) => ingredient.id !== id));
  };
  return (
    <>
      {ingredient.map((item, index) => {
        return (
          <div className="flex justify-center" key={index}>
            <div>
              <div className="w-[55rem] border-[1px] h-8 border-black flex justify-around">
                {editMode ? (
                  <input type="text" placeholder="요리이름" className="w-28"></input>
                ) : (
                  <div className="w-28">{item.name}</div>
                )}
                {editMode ? (
                  <input type="text" placeholder="요리 원가" className="w-28"></input>
                ) : (
                  <div className="w-28">{item.primePrice.toLocaleString()}원</div>
                )}
                {editMode ? (
                  <input type="text" placeholder="요리 판매가" className="w-28"></input>
                ) : (
                  <div className="w-28">{item.fixedPrice.toLocaleString()}원</div>
                )}
                <button onClick={handleAddIngredient} className="w-28">
                  재료 추가 +
                </button>
              </div>
              {ingredient.map((item, index) => (
                <IngredientBox
                  key={index}
                  ingredient={item.ingredients}
                  ingredientId={item.id}
                  onRemove={handleRemoveIngredient}
                  editMode={editMode}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};
