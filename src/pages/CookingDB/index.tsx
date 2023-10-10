import { useEffect } from 'react';
import { DBBox } from '../../components/databox/DBBox';
import { useRecoilState } from 'recoil';
import { DBAtom, EditMode } from '../../recoil/DBAtom';
import { useAxiosInstance } from '../../Axios/api';
export const CookingDB = () => {
  const [DB, setDB] = useRecoilState(DBAtom);
  const [edit, setEdit] = useRecoilState(EditMode);
  const instance = useAxiosInstance();

  console.log('db:', DB);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response:any = await instance.get('food/recipes');

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

  const consoleLog = () => {
    console.log(DB[0]);
  };

  const handleProduceRecipes = (foodIdx: number) => {
    setDB((prevData) => {
      const newData = [...prevData];

      // newData[foodIdx]가 없으면 빈 객체로 초기화합니다.
      if (!newData[foodIdx]) {
        newData[foodIdx] = {
          id: 0, // 새로운 요리의 id를 적절히 설정해야 합니다.
          name: '', // 새로운 요리의 이름을 설정하세요.
          fixedPrice: 0, // 새로운 요리의 고정 가격을 설정하세요.
          primePrice: 0, // 새로운 요리의 원가를 설정하세요.
          recipes: [], // 빈 레시피 목록으로 초기화합니다.
        };
      }

      newData[foodIdx] = {
        ...newData[foodIdx],
        recipes: [...newData[foodIdx].recipes, { id: 0, quantity: 0, ingredientName: '', units: 'g' }],
      };

      return newData;
    });
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
          <button className="w-24 h-6 bg-blue-500 hover:bg-blue-600 text-sm text-white text-center rounded-2xl ml-4">
            저장
          </button>
          <button
            className="w-24 h-6 bg-green-500 hover:bg-green-600 text-sm text-white text-center rounded-2xl ml-4"
            onClick={() => handleProduceRecipes(DB.length)}
          >
            요리 추가 +
          </button>
          <button onClick={consoleLog}>new Data</button>
        </div>
        <DBBox />
      </div>
    </div>
  );
};
