import {useEffect} from "react";
import {SettlementData} from "../../interface/DataInterface";
import {checkTokenValidate, useAxiosInstance} from "../../Axios/api";
import {useRecoilState, useRecoilValue} from "recoil";
import {foodData, isLoginModalOpen, isMobile, totalPriceSet} from "../../recoil/DBAtom";

export const SettleDatabox = ({date}:any) => {
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceSet);
  const instance = useAxiosInstance();
  const [foods, setFoods] = useRecoilState<SettlementData[]>(foodData);
  const [, setIsLoginModalOpen] = useRecoilState(isLoginModalOpen)
  const isMobileState = useRecoilValue(isMobile)

  const handleCountChange = (itemId: number, count: any) => {
    const newFoods = foods.map((item: SettlementData) => {
      if (item.id === itemId) {
        return {...item, count: parseInt(count, 10)};
      }
      return item;
    });
    setFoods(newFoods);
  };

  const handleNoteChange = (itemId: number, note: string) => {
    if (note.length > 20) return
    const newFoods = foods.map((item: SettlementData) => {
      if (item.id === itemId) {
        return {...item, note: note};
      }
      return item;
    });
    setFoods(newFoods);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await instance.get(`settlement/${date}`)
        const foods = response.data.foods;
        if (foods.length > 0){
          setFoods(foods)
          return
        }
        try {
          const response: any = await instance.get("food");
          const needData = response.data.map((item: SettlementData) => ({
            ...item,
            count: 0,
            id: item.id,
            note: ""
          }))
          setFoods(needData);
        } catch (error) {
          checkTokenValidate(error, setIsLoginModalOpen)
        }
      }catch (error){
        checkTokenValidate(error, setIsLoginModalOpen)
      }
    }
    fetchData().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    let sum = 0;
    foods.map((item: SettlementData) => {
      sum += item.count * item.fixedPrice;
      // eslint-disable-next-line array-callback-return
      return;
    });
    setTotalPrice(sum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foods, date]);

  return (
    <div>
      {isMobileState?
          <div className="flex justify-center flex-col min-w-[20rem] overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-1.5 py-4">
            <div className="flex font-bold mr-1 border-b-2 border-black pb-2 text-red-400">합계 : {totalPrice.toLocaleString()} 원</div>
            <table className="text-center text-sm font-light">
              <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
                <tr>
                  <th scope="col" className="px-1 py-4 text-center">요리명</th>
                  <th scope="col" className="px-1 py-4 text-center">단가</th>
                  <th scope="col" className="px-1 py-4 text-center">판매</th>
                  <th scope="col" className="px-1 py-4 text-center">소계</th>
                  <th scope="col" className="px-1 py-4 text-center">비고</th>
                </tr>
              </thead>
              <tbody>
              {foods.map((item: SettlementData, idx: number): any => {
                return (
                    <tr key={idx} className="border-b dark:border-neutral-500">
                      <td className="px-1 py-4 font-medium text-right">{item.name}</td>
                      <td className="px-1 py-4 text-right">{item.fixedPrice.toLocaleString()} 원</td>
                      <td className="px-1 py-4 text-right">
                        <input
                            type="number"
                            min="0"
                            max="9999"
                            placeholder="0"
                            className=" border-b-2 border-black text-right w-12"
                            value={item.count}
                            onChange={(e) => {
                              handleCountChange(item.id, e.target.value);
                              // item.count = parseInt(e.target.value, 10);
                            }}
                        ></input>
                        <> 개</>
                      </td>
                      <td className="whitespace-nowrap  px-1 py-4 text-right">{((item.count ?? 0) * item.fixedPrice).toLocaleString()} 원</td>
                      <td className="whitespace-wrap">
                        <input
                            type={"text"}
                            className=" border-b-2 border-black w-10"
                            maxLength={20}
                            value={item.note ?? ""}
                            onChange={(e) =>
                                handleNoteChange(item.foodId ?? item.id, e.target.value)}/>
                      </td>
                    </tr>
                );
              })}
              </tbody>
            </table>
          </div>
          :
          <div className="flex justify-center flex-col w-[60rem]overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-4 py-4">
            <div className="flex justify-end font-bold mr-1 border-b-2 border-black pb-2 text-red-400">합계 : {totalPrice.toLocaleString()} 원</div>
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
              <tr>
                <th scope="col" className="w-4 px-6 py-4"></th>
                <th scope="col" className=" px-6 py-4 text-right">요리명</th>
                <th scope="col" className=" px-6 py-4 text-right">단가</th>
                <th scope="col" className=" px-6 py-4 text-right">판매개수</th>
                <th scope="col" className=" px-6 py-4 text-right">소계</th>
                <th scope="col" className=" px-[3rem] py-4 text-right mr-4">비고</th>
              </tr>
              </thead>
              <tbody>
              {foods.map((item: SettlementData, idx: number): any => {
                return (
                    <tr key={idx} className="border-b dark:border-neutral-500">
                      <td>{idx + 1}</td>
                      <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">{item.name}</td>
                      <td className="whitespace-nowrap  px-6 py-4 text-right">{item.fixedPrice.toLocaleString()} 원</td>
                      <td className="whitespace-nowrap  px-6 py-4 text-right">
                        <input
                            type="number"
                            min="0"
                            max="9999"
                            placeholder="0"
                            className=" border-b-2 border-black w-24 text-right w-12"
                            value={item.count}
                            onChange={(e) => {
                              handleCountChange(item.id, e.target.value);
                              // item.count = parseInt(e.target.value, 10);
                            }}
                        ></input>
                        <> 개</>
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4 text-right">{((item.count ?? 0) * item.fixedPrice).toLocaleString()} 원</td>
                      <td className="whitespace-nowrap">
                        <input
                            type={"text"}
                            className=" border-b-2 border-black w-36"
                            maxLength={20}
                            value={item.note ?? ""}
                            onChange={(e) =>
                                handleNoteChange(item.foodId ?? item.id, e.target.value)}/>
                      </td>
                    </tr>
                );
              })}
              </tbody>
            </table>
          </div>
      }
    </div>
  );
};
