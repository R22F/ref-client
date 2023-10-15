import { useEffect, useState } from "react";
import { SettlementData } from "../../interface/DataInterface";
import data from "../../pages/Settlement/data.json";
import { useAxiosInstance } from "../../Axios/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { settlementData, settlementDate } from "../../recoil/DBAtom";

export const SettleDatabox = () => {
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const instance = useAxiosInstance();
  // const [foods, setFoods] = useRecoilState(settlementData);
  const foods = useRecoilValue(settlementData);
  const settleDate = useRecoilState(settlementDate);

  const handleCountChange = (itemId: number, count: any) => {
    setItemCounts((prevCounts) => {
      return { ...prevCounts, [itemId]: count };
    });
  };

  useEffect(() => {
    if (settleDate[0] == "") return;

    instance
      .get(`/settlement/${settleDate[0]}`)
      .then((response) => {
        console.log("response", response);
        console.log("foods", foods);
      })
      .catch((err) => {
        console.log(err);
      });

    let sum = 0;
    for (let itemId in itemCounts) {
      sum +=
        (itemCounts[itemId] || 0) *
        (data.data.find((item) => item.id === parseInt(itemId))?.price || 0);
    }
    setTotalPrice(sum);
  }, [itemCounts, settleDate]);

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
        {/* id: number; name: string; fixedPrice: number; count: number; */}
        <tbody>
          {foods.map((item: SettlementData, idx: number): any => {
            return (
              <tr key={idx} className="border-b dark:border-neutral-500">
                <td>{idx + 1}</td>
                <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">
                  {item.name}
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  {item.fixedPrice.toLocaleString()} 원
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
                  {(
                    (itemCounts[item.id] ?? 0) * item.fixedPrice
                  ).toLocaleString()}{" "}
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
