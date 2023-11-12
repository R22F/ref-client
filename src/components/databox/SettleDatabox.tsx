import {useEffect, useState} from "react";
import {SettlementData} from "../../interface/DataInterface";
import {useAxiosInstance} from "../../Axios/api";
import {useRecoilState} from "recoil";
import {foodData, settlementDate, totalPriceSet} from "../../recoil/DBAtom";

export const SettleDatabox = () => {
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});
  // const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceSet);
  const instance = useAxiosInstance();
  const [foods, setFoods] = useRecoilState<SettlementData[]>(foodData);
  const settleDate = useRecoilState(settlementDate);

  const handleCountChange = (itemId: number, count: any) => {
    // const newfoods = foods.map((item: SettlementData) => ({
    //   ...item,
    //   count: parseInt(count, 10),
    // }));
    const newfoods = foods.map((item: SettlementData) => {
      if (item.id === itemId) {
        return { ...item, count: parseInt(count, 10) };
      }
      return item;
    });
    setFoods(newfoods);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await instance.get("food");
      const needData = response.data.map((item: SettlementData) => ({
        ...item,
        count: 0,
        foodId: item.id,
      }));
      setFoods(needData);
      // setFoods(response.data)
    };
    fetchData();
  }, []);

  useEffect(() => {
    let sum = 0;
    foods.map((item: SettlementData) => {
      sum += item.count * item.fixedPrice;
    });
    setTotalPrice(sum);
  }, [foods]);

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
                    onChange={(e) => {
                      handleCountChange(item.id, e.target.value);
                      // item.count = parseInt(e.target.value, 10);
                    }}
                  ></input>
                  <> 개</>
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  {((item.count ?? 0) * item.fixedPrice).toLocaleString()} 원
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
