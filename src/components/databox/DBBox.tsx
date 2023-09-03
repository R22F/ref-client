import { IngredientBox } from './IngredientBox';

interface DBBoxProps {
  editMode: boolean;
}

export const DBBox: React.FC<DBBoxProps> = () => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-center flex-col w-[70rem] overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-4 py-4">
        <div className="flex justify-end font-bold mr-1 border-b-2 border-black pb-2 text-red-400">합계 : 원</div>
        <table className="min-w-full text-center text-sm font-light">
          <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
            <tr>
              <th scope="col" className=" py-4 text-right">
                요리명
              </th>
              <th scope="col" className=" py-4 text-right">
                요리원가
              </th>
              <th scope="col" className="py-4 text-right">
                요리 판매가
              </th>
              <th scope="col" className=" py-4 text-right">
                요리제거
              </th>
              <th scope="col" className="py-4 text-right mr-10">
                요리추가
              </th>
            </tr>
          </thead>
          <tbody>
            <IngredientBox />
          </tbody>
        </table>
      </div>
    </div>
  );
};
