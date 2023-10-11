import { IngredientInfo } from './IngredientInfo';

export const AddRecipe = ({ add, setAdd }: { add: boolean; setAdd: Function }) => {
  const modalblur = () => {
    return add ? 'fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity' : '';
  };
  const inputcss = () => {
    return ' px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-300 focus:border-2 ';
  };

  const buttonDesign = () => {
    return 'bg-white hover:bg-red-500 hover:border-red-200 hover:text-red-200 text-red-400 font-semibold py-2 px-4 border border-red-400 rounded shadow whitespace-nowrap text-right';
    //  "bg-red-400 border-red-100 text-red-100 font-semibold py-2 px-4 border rounded shadow ml-4"
  };
  const eraseButtonDesign = () => {
    return 'bg-white hover:bg-gray-400 hover:border-gray-100 hover:text-gray-100 text-gray-400 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-auto whitespace-nowrap text-right';
  };

  const postRecipe = () => {};
  return (
    <div className={modalblur()}>
      <div className="flex justify-center flex-col mt-[20rem] items-center ml-[10rem]">
        <div className="w-[60rem] overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-4 py-4 bg-white">
          <table className="min-w-full text-center text-sm font-light border-t-2 border-black bg-white">
            <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800 ">
              <tr>
                <th scope="col" className="whitespace-nowrap px-6 py-4 text-right">
                  요리명
                </th>
                <th scope="col" className="px-2 py-4 text-right">
                  요리원가
                </th>
                <th scope="col" className="px-2 py-4 text-right">
                  요리 판매가
                </th>
              </tr>
            </thead>
            <tbody>
              <th className="whitespace-nowrap  px-6 py-4 font-medium text-right">
                <input type="text" id="name-input" className={inputcss()}  />
              </th>
              <th className="whitespace-nowrap  px-6 py-4 font-medium text-right">
                <input type="text" id="name-input" className={inputcss()}  />
              </th>
              <th className="whitespace-nowrap  px-6 py-4 font-medium text-right">
                <input type="text" id="name-input" className={inputcss()}  />
              </th>

              {/*재료추가 인풋창 */}

              {/*재료추가 인풋 끝 */}
              <tr className="border-b dark:border-neutral-500"></tr>
            </tbody>
          </table>
          <IngredientInfo />
          <button
            className={eraseButtonDesign()}
            onClick={() => {
              setAdd(false);
            }}
          >
            취소
          </button>
          <button className={buttonDesign()} onClick={postRecipe}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};
