import { useEffect, useState } from 'react';
import { DBBox } from '../../components/databox/DBBox';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { DBAtom, EditMode } from '../../recoil/DBAtom';
import { Ingredient } from '../../interface/DataInterface';

export const CookingDB = () => {
  const [DB, setDB] = useRecoilState(DBAtom);
  const [edit, setEdit] = useRecoilState(EditMode);
  const [newIngredient, setNewIngredient] = useState<Ingredient>({ id: 0, ingredientName: '', quantity: 0, units: '' });
  console.log('db:', DB);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://server-ref.kro.kr/food/recipes');
        setDB(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleEditMode = (_e: React.MouseEvent<HTMLButtonElement>) => {
    setEdit(!edit);
  };
  const handleSendData = (_e: React.MouseEvent<HTMLButtonElement>) => {
    setEdit(!edit);
  };

  const handleSaveNewIngredient = (foodIdx: number) => {
    if (newIngredient.ingredientName && newIngredient.quantity && newIngredient.units) {
      setDB((prevData) => {
        const newData = [...prevData];
        newData[foodIdx] = {
          ...newData[foodIdx],
          recipes: [...newData[foodIdx].recipes, newIngredient],
        };

        return newData;
      });
    }

    setNewIngredient({ id: 0, ingredientName: '', quantity: 0, units: '' });
    setEdit(!edit);
  };

  return (
    <div className="flex justify-center">
      <div className="border-[1px] border-black w-[80rem] min-h-[40rem] mt-4">
        <div className="flex justify-end p-4">
          <input
            type="text"
            className="border-[1px] border-black rounded-xl px-2 py-1"
            placeholder="요리명으로 검색"
          ></input>
          <button className="w-14 h-9 bg-sky-500 hover:bg-sky-600 text-sm text-white text-center rounded-md ml-4">
            검색
          </button>
        </div>
        <div className="flex justify-end p-4">
          <button
            onClick={handleEditMode}
            className="w-24 h-6 bg-blue-500 hover:bg-blue-600 text-sm text-white text-center rounded-2xl"
          >
            수정
          </button>
          <button
            onClick={()=>handleSaveNewIngredient(DB.length+1)}
            className="w-24 h-6 bg-blue-500 hover:bg-blue-600 text-sm text-white text-center rounded-2xl ml-4"
          >
            저장
          </button>
          <button className="w-24 h-6 bg-green-500 hover:bg-green-600 text-sm text-white text-center rounded-2xl ml-4">
            요리 추가 +
          </button>
        </div>
        <DBBox />
      </div>
    </div>
  );
};
