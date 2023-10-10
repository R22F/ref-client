import axios, { AxiosInstance } from 'axios';
import { useAxiosInstance } from '../../Axios/api';
export const AddIngredient = ({ add, setAdd, setInv }: { add: boolean; setAdd: Function; setInv: Function }) => {
  const instance: AxiosInstance = useAxiosInstance();

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

  const today = new Date().toISOString().split('T')[0];

  interface AddIngreData {
    name: string; // 재료 이름
    buyDate: string; // 구매일
    units: string; // 단위
    url: string;
    unitQuantity: number; // 사용자 단위 수량
    remainQuantity: number; // 재고 수량
    expiredPeriod: number; // +유효기간
    alertQuantity: number; // 알림 수량
    unitPrice: number; // 사용자 단위 수량별 단위가격
    relievedQuantity: number; // 구매 수량
  }

  const addIngreData: AddIngreData = {
    name: '', // 재료 이름
    buyDate: '', // 구매일
    units: '', // 단위
    url: '',
    unitQuantity: 0,
    remainQuantity: 0, // 재고 수량
    expiredPeriod: 0, // +유효기간
    alertQuantity: 0, // 알림 수량
    unitPrice: 0, // 사용자 단위 수량별 단위가격
    relievedQuantity: 0, // 구매 수량
  };
  const postIngredient = () => {
    const strName = document.getElementById('name-input') as HTMLInputElement;
    const strBuyDate = document.getElementById('buyDate-input') as HTMLInputElement;
    const strUnits = document.getElementById('units-input') as HTMLInputElement;
    const strUrl = document.getElementById('url-input') as HTMLInputElement;
    const numUnitQuantity = document.getElementById('unitQuantity-input') as HTMLInputElement;
    const numRemainQuantity = document.getElementById('remainQuantity-input') as HTMLInputElement;
    const numExpiredPeriod = document.getElementById('expiredPeriod-input') as HTMLInputElement;
    const numAlertQuantity = document.getElementById('alertQuantity-input') as HTMLInputElement;
    const numUnitPrice = document.getElementById('unitPrice-input') as HTMLInputElement;
    const numRelievedQuantity = document.getElementById('relievedQuantity-input') as HTMLInputElement;

    addIngreData.name = strName.value;
    addIngreData.buyDate = strBuyDate.value;
    addIngreData.units = strUnits.value;
    addIngreData.url = strUrl.value;
    addIngreData.unitQuantity = parseInt(numUnitQuantity?.value || '', 10);
    addIngreData.remainQuantity = parseInt(numRemainQuantity?.value || '', 10);
    addIngreData.expiredPeriod = parseInt(numExpiredPeriod?.value || '', 10);
    addIngreData.alertQuantity = parseInt(numAlertQuantity?.value || '', 10);
    addIngreData.unitPrice = parseInt(numUnitPrice?.value || '', 10);
    addIngreData.relievedQuantity = parseInt(numRelievedQuantity?.value || '', 10);

    instance
      .post('/inventory/', addIngreData)
      .then(() => {
        instance
          .get('/inventory/')
          .then((response) => {
            // 응답 처리 로직 작성
            setInv(response.data);
          })
          .catch((error) => {
            // 에러 처리 로직 작성
            console.error(error);
          });
        setAdd(false);
      })
      .catch((error) => {
        console.error('에러:', error);
        alert('재료 추가에 실패했습니다.');
      });
  };

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
                      setAdd(false);
                    }}
                  >
                    취소
                  </button>
                </td>
                <td>
                  <button className={buttonDesign()} onClick={postIngredient}>
                    저장
                  </button>
                </td>
                <td className="whitespace-nowrap  px-6 py-4 font-medium text-right">
                  <input type="text" id="name-input" className={inputcss()} required />
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <input type="number" id="remainQuantity-input" className={inputcss()} required />
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <select className={inputcss()} id="units-input" required>
                    <option value="g">g</option>
                    <option value="ea">ea</option>
                  </select>
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <input type="date" className={inputcss()} defaultValue={today} id="buyDate-input" required />
                </td>

                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <input type="number" className={inputcss()} id="alertQuantity-input" required />
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <input type="number" className={inputcss()} id="unitPrice-input" required />원
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <input type="number" className={inputcss()} id="unitQuantity-input" required />
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <input type="number" className={inputcss()} id="expiredPeriod-input" required />
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <input type="number" className={inputcss()} id="relievedQuantity-input" required />
                </td>
                <td className="whitespace-nowrap  px-6 py-4 text-right">
                  <input type="text" className={inputcss()} id="url-input" />
                </td>
                <td>
                  <button className={buttonDesign()} onClick={postIngredient}>
                    저장
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
