import {useRecoilValue} from "recoil";
import {SettlementData} from "../../interface/DataInterface";
import {foodData, isMobile} from "../../recoil/DBAtom";
import {useNavigate} from "react-router-dom";
import {RouteConst} from "../../interface/RouteConst";

export const TotalData = () => {
  const foods = useRecoilValue(foodData);
  const navigate = useNavigate()
  const isMobileState = useRecoilValue(isMobile)
  return (
    <>
      {isMobileState?
          <>
            <div
                className="flex justify-center flex-col min-w-[20rem] overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-1.5 py-4">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
                <tr>
                  <th scope="col" className=" px-1 py-4 text-center">요리</th>
                  <th scope="col" className=" px-1 py-4 text-center">단가</th>
                  <th scope="col" className=" px-1 py-4 text-center">판매</th>
                  <th scope="col" className=" px-1 py-4 text-center">소계</th>
                  <th scope="col" className=" px-1 py-4 text-center mr-4"></th>
                </tr>
                </thead>
                <tbody>
                {foods.map((item: SettlementData, idx: number): any => {
                  return (
                      <tr key={idx} className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap  px-1 py-4 font-medium text-center">{item.name}</td>
                        <td className="whitespace-nowrap  px-1 py-4 font-medium text-center">{item.fixedPrice.toLocaleString()} 원</td>
                        <td className="whitespace-nowrap  px-1 py-4 font-medium text-center">{item.count.toLocaleString()} 개</td>
                        <td className="whitespace-nowrap  px-1 py-4 font-medium text-center">{(item.fixedPrice * item.count).toLocaleString()} 원</td>
                        <td className="whitespace-nowrap  px-1 py-4 font-medium text-center">
                          <button
                              className={"bg-white hover:bg-red-500 hover:border-red-200 hover:text-red-200 text-red-400 font-semibold py-2 px-1 border border-red-400 rounded shadow whitespace-nowrap text-right"
                              } onClick={() => {
                            navigate(RouteConst.settlement)
                          }}>수정
                          </button>
                        </td>
                      </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
          </>
          :
          <>
            <div
                className="flex justify-center flex-col w-[60rem] overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-4 py-4">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
                <tr>
                  <th scope="col" className="w-4 px-6 py-4"></th>
                  <th scope="col" className=" px-6 py-4 text-right">요리명</th>
                  <th scope="col" className=" px-6 py-4 text-right">단가</th>
                  <th scope="col" className=" px-6 py-4 text-right">판매개수</th>
                  <th scope="col" className=" px-6 py-4 text-right">소계</th>
                  <th scope="col" className=" px-6 py-4 text-right">비고</th>
                  <th scope="col" className=" px-6 py-4 text-right mr-4"></th>
                </tr>
                </thead>
                <tbody>
                {foods.map((item: SettlementData, idx: number): any => {
                  return (
                      <tr key={idx} className="border-b dark:border-neutral-500">
                        <td>{idx + 1}</td>
                        <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">{item.name}</td>
                        <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">{item.fixedPrice.toLocaleString()} 원</td>
                        <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">{item.count.toLocaleString()} 개</td>
                        <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">{(item.fixedPrice * item.count).toLocaleString()} 원</td>
                        <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">{item.note}</td>
                        <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">
                          <button
                              className={"bg-white hover:bg-red-500 hover:border-red-200 hover:text-red-200 text-red-400 font-semibold py-2 px-4 border border-red-400 rounded shadow whitespace-nowrap text-right"
                              } onClick={() => {
                            navigate(RouteConst.settlement)
                          }}>수정
                          </button>
                        </td>
                      </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
          </>
      }
    </>
  );
};
