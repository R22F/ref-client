import {useRecoilValue} from "recoil";
import {SettlementData} from "../../interface/DataInterface";
import {foodData} from "../../recoil/DBAtom";

export const TotalData = () => {
  const foods = useRecoilValue(foodData);
  return (
    <div className="flex justify-center flex-col w-[60rem] overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-4 py-4">
      <table className="min-w-full text-center text-sm font-light">
        <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
          <tr>
            <th scope="col" className="w-4 px-6 py-4"></th>
            <th scope="col" className=" px-6 py-4 text-right">
              요리명
            </th>
            <th scope="col" className=" px-6 py-4 text-right">
              단가
            </th>
            <th scope="col" className=" px-6 py-4 text-right">
              판매개수
            </th>
            <th scope="col" className=" px-6 py-4 text-right mr-4">
              소계
            </th>
            <th scope="col" className=" px-6 py-4 text-right mr-4">
            </th>
          </tr>
        </thead>
        <tbody>
          {foods.map((item: SettlementData, idx: number): any => {
            return (
              <tr key={idx} className="border-b dark:border-neutral-500">
                <td>{idx + 1}</td>
                <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">
                  {item.name}
                </td>
                <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">
                  {item.fixedPrice.toLocaleString()} 원
                </td>
                <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">
                  {item.count.toLocaleString()} 개
                </td>
                <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">
                  {(item.fixedPrice * item.count).toLocaleString()} 원
                </td>
                <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">
                  <button className={"bg-white hover:bg-red-500 hover:border-red-200 hover:text-red-200 text-red-400 font-semibold py-2 px-4 border border-red-400 rounded shadow whitespace-nowrap text-right"
                  } onClick={()=>{console.log("TODO : 하나씩 변경 하거나 수정 가능")}}>수정</button>
                </td>
              </tr>
              //   <tr className="border-b dark:border-neutral-500">
              //   <td>{idx + 1}</td>
              //   <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">
              //     {item.dish}
              //   </td>
              //   <td className="whitespace-nowrap  px-6 py-4 text-right">
              //     {item.price.toLocaleString()} 원
              //   </td>
              //   <td className="whitespace-nowrap  px-6 py-4 text-right">
              //     <input
              //       type="number"
              //       min="0"
              //       max="9999"
              //       placeholder="0"
              //       className=" border-b-2 border-black w-24 text-right w-12"
              //       onChange={(e) => handleCountChange(item.id, e.target.value)}
              //     ></input>
              //     <> 개</>
              //   </td>
              //   <td className="whitespace-nowrap  px-6 py-4 text-right">
              //     {((itemCounts[item.id] ?? 0) * item.price).toLocaleString()}{" "}
              //     원
              //   </td>
              // </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
