import { useEffect, useState } from "react";
import { SettlementData } from "../../interface/DataInterface";
import data from "../../pages/Settlement/data.json";

export const SettleDatabox = () => {
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleCountChange = (itemId: number, count: any) => {
    setItemCounts((prevCounts) => {
      return { ...prevCounts, [itemId]: count };
    });
  };

  useEffect(() => {
    let sum = 0;
    for (let itemId in itemCounts) {
      sum +=
        (itemCounts[itemId] || 0) *
        (data.data.find((item) => item.id === parseInt(itemId))?.price || 0);
    }
    setTotalPrice(sum);
  }, [itemCounts]);

  return (
    <div className="flex justify-center flex-col w-[60rem] overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-4 py-4">
      <div className="flex justify-end font-bold mr-1 border-b-2 border-black pb-2 text-red-400">
        합계 : {totalPrice.toLocaleString()} 원
      </div>
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
          </tr>
        </thead>
        <tbody>
          {data.data.map((item: SettlementData, idx: number): any => {
            return (
              <tr className="border-b dark:border-neutral-500">
                <td>{idx + 1}</td>
                <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">
                  {item.dish}
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  {item.price.toLocaleString()} 원
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <input
                    type="number"
                    min="0"
                    max="9999"
                    placeholder="0"
                    className=" border-b-2 border-black w-24 text-right w-12"
                    onChange={(e) => handleCountChange(item.id, e.target.value)}
                  ></input>
                  <> 개</>
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  {((itemCounts[item.id] ?? 0) * item.price).toLocaleString()}{" "}
                  원
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
