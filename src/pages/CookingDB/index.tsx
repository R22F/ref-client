import { useEffect, useState } from 'react';
import { DBBox } from '../../components/databox/DBBox';
import { useRecoilState } from 'recoil';
import { DBAtom, EditMode } from '../../recoil/DBAtom';
import { useAxiosInstance } from '../../Axios/api';
import { AddRecipe } from './addRecipe';
import { ModifyRecipe } from './ModifyRecipe';
export const CookingDB = () => {
  const [DB, setDB] = useRecoilState(DBAtom);
  const [edit, setEdit] = useRecoilState(EditMode);
  const instance = useAxiosInstance();

  const [add, setAdd] = useState(false);
  const [mod, setMod] = useState(false);
  

  console.log('db:', DB);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await instance.get('food/recipes');

        setDB(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="flex justify-center">
      <div className="w-[80rem] min-h-[40rem] mt-4">
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
            className="w-24 h-6 bg-green-500 hover:bg-green-600 text-sm text-white text-center rounded-2xl ml-4"
            onClick={() => setAdd(true)}
          >
            요리 추가 +
          </button>
        </div>
        <DBBox />
        {add && <AddRecipe add={add} setAdd={setAdd}/>}
        {mod && <ModifyRecipe mod={mod} setMod={setMod}/>}
      </div>
    </div>
  );
};
