export const ModifyRecipe = ({ mod, setMod }: { mod: boolean; setMod: Function }) => {
  const modalblur = () => {
    return mod ? 'fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity' : '';
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

  const today = new Date().toISOString().split('T')[0];

  const putRecipe = () => {

  }
  return (
    <div className={modalblur()}>
      <div className="flex justify-center flex-col mt-[20rem] items-left ml-[10rem]">
        <div className="w-full overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-4 py-4 bg-white">
          <table className="min-w-full text-center text-sm font-light border-t-2 border-black bg-white">
            <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800 ">
              <tr>
                <th scope="col" className=" px-6 py-4 text-right mr-4"></th>
                <th scope="col" className=" px-6 py-4 text-right mr-4"></th>
                <th scope="col" className="whitespace-nowrap px-6 py-4 text-right">
                  재료명
                </th>
                <th scope="col" className=" px-6 py-4 text-right">
                  남은 재고
                </th>
                <th scope="col" className=" px-6 py-4 text-right">
                  단위
                </th>
                <th scope="col" className=" px-6 py-4 text-right">
                  구매 날짜
                </th>

                <th scope="col" className=" px-6 py-4 text-right mr-4">
                  재고 경고량
                </th>
                <th scope="col" className=" px-6 py-4 text-right mr-4">
                  구매 가격(원가)
                </th>
                <th scope="col" className=" px-6 py-4 text-right mr-4">
                  구매 묶음 양
                </th>
                <th scope="col" className=" px-6 py-4 text-right mr-4">
                  소비 기한
                </th>
                <th scope="col" className=" px-6 py-4 text-right mr-4">
                  이상적인 양
                </th>
                <th scope="col" className=" px-6 py-4 text-right mr-4">
                  구매 링크
                </th>
                <th scope="col" className=" px-6 py-4 text-right mr-4"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-neutral-500">
                <td>
                  <button
                    className={eraseButtonDesign()}
                    onClick={() => {
                      setMod(false);
                    }}
                  >
                    취소
                  </button>
                </td>
                <td>
                  <button className={buttonDesign()} onClick={putRecipe}>
                    수정
                  </button>
                </td>
                <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">
                  <input type="text" id="name-input" className={inputcss()} required />
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <input
                    type="number"
                    id="remainQuantity-input"
                    className={inputcss()}
                    required
                  />
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <select className={inputcss()} id="units-input" required >
                    <option value="g">g</option>
                    <option value="ea">ea</option>
                  </select>
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <input type="date" className={inputcss()} defaultValue={today} id="buyDate-input" required />
                </td>

                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <input
                    type="number"
                    className={inputcss()}
                    id="alertQuantity-input"
                    required
                  />
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <input
                    type="number"
                    className={inputcss()}
                    id="unitPrice-input"
                    required
                  />
                  원
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <input
                    type="number"
                    className={inputcss()}
                    id="unitQuantity-input"
                    required
                  />
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <input
                    type="number"
                    className={inputcss()}
                    id="expiredPeriod-input"
                    required
                  />
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <input
                    type="number"
                    className={inputcss()}
                    id="relievedQuantity-input"
                    required
                  />
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <input type="text" className={inputcss()} id="url-input" />
                </td>
                <td>
                  <button className={buttonDesign()} onClick={putRecipe}>
                    수정
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
