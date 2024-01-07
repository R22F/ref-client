import {AxiosInstance} from 'axios';
import {IngredientDto} from '../../interface/DataInterface';
import {checkTokenValidate, useAxiosInstance} from '../../Axios/api';
import {useRecoilState, useRecoilValue} from "recoil";
import {isLoginModalOpen, isMobile} from "../../recoil/DBAtom";

export const ModifyIngredient = ({
  mod,
  setMod,
  setInv,
  ingredient,
}: {
  mod: boolean;
  setMod: Function;
  setInv: Function;
  ingredient?: IngredientDto;
}) => {
  const instance: AxiosInstance = useAxiosInstance();
  const [, setIsLoginModalOpen] = useRecoilState(isLoginModalOpen)
  const isMobileState = useRecoilValue(isMobile)

  const modalblur = () => {
    return mod ? 'fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity' : '';
  };
  const inputcss = () => {
    return 'px-4 py-2 w-[10rem] border border-gray-300 rounded focus:outline-none focus:border-red-300 focus:border-2 ';
  };

  const buttonDesign = () => {
    return "bg-white hover:bg-red-500 hover:border-red-200 hover:text-red-200 text-red-400 font-semibold py-2 px-2 border border-red-400 rounded shadow whitespace-nowrap text-right";
    //  "bg-red-400 border-red-100 text-red-100 font-semibold py-2 px-4 border rounded shadow ml-4"
  };
  const eraseButtonDesign = () => {
    return "bg-white hover:bg-gray-400 hover:border-gray-100 hover:text-gray-100 text-gray-400 font-semibold py-2 px-2 border border-gray-400 rounded shadow mr-auto whitespace-nowrap text-right";
  };

  const today = new Date().toISOString().split('T')[0];

  interface ModIngreData {
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

  const modIngreData: ModIngreData = {
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

  const putIngredient = () => {
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

    modIngreData.name = strName.value;
    modIngreData.buyDate = strBuyDate.value;
    modIngreData.units = strUnits.value;
    modIngreData.url = strUrl.value;
    modIngreData.unitQuantity = parseInt(numUnitQuantity?.value || '', 10);
    modIngreData.remainQuantity = parseInt(numRemainQuantity?.value || '', 10);
    modIngreData.expiredPeriod = parseInt(numExpiredPeriod?.value || '', 10);
    modIngreData.alertQuantity = parseInt(numAlertQuantity?.value || '', 10);
    modIngreData.unitPrice = parseInt(numUnitPrice?.value || '', 10);
    modIngreData.relievedQuantity = parseInt(numRelievedQuantity?.value || '', 10);

    instance
      .put(`/inventory/${ingredient?.id}`, modIngreData)
      .then(() => {
        instance
          .get('/inventory/')
          .then((response) => {
            // 응답 처리 로직 작성
            setInv(response.data);
          })
          .catch((error) => {
            checkTokenValidate(error, setIsLoginModalOpen)
          });
        setMod(false);
      })
      .catch((error) => {
        checkTokenValidate(error, setIsLoginModalOpen)
      });
  };

  return (
    <div className={modalblur()}>
      {isMobileState?
          <>
            <div className="flex flex-col w-[20rem] h-screen items-center justify-center  m-auto">
              <div className="w-full overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-4 py-4 bg-white">
                <button className={buttonDesign()} onClick={putIngredient}>수정</button>
                <button className={eraseButtonDesign()} onClick={() => {
                  setMod(false);
                }}>취소
                </button>
                <table className="min-w-full mt-2 text-center text-sm font-light border-t-2 border-black bg-white">
                  <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800 ">
                  <tr>
                    <th scope="col" className="px-1 py-1 ">이름</th>
                    <td className="px-1 py-1 font-medium text-center">
                      <input type="text" id="name-input" className={inputcss()} defaultValue={ingredient?.name} required/>
                    </td>
                  </tr>
                  <tr>
                    <th scope="col" className="px-1 py-1 ">재고</th>
                    <td className="whitespace-nowrap px-6 py-1 text-center">
                      <input type="number" id="remainQuantity-input" className={inputcss()} defaultValue={ingredient?.remainQuantity}
                             required/>
                    </td>
                  </tr>
                  <tr>
                    <th scope="col" className="px-1 py-1 ">단위</th>
                    <td className="whitespace-nowrap px-1 py-1 text-center">
                      <select className={inputcss()} id="units-input" defaultValue={ingredient?.units} required>
                        <option value="g">g</option>
                        <option value="ea">ea</option>
                        <option value="ml">ml</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th scope="col" className="px-1 py-1 ">구매일</th>
                    <td className="whitespace-nowrap px-1 py-1 ">
                      <input type="date" className={inputcss()} defaultValue={ingredient?.buyDate} id="buyDate-input" required/>
                    </td>
                  </tr>
                  <tr>
                    <th scope="col" className="px-1 py-1 ">경고량</th>
                    <td className="whitespace-nowrap px-1 py-1 ">
                      <input type="number" className={inputcss()} defaultValue={ingredient?.alertQuantity} id="alertQuantity-input"
                             required/>
                    </td>
                  </tr>
                  <tr>
                    <th scope="col" className="px-1 py-1 ">구매가</th>
                    <td className="whitespace-nowrap px-1 py-1 ">
                      <input type="number" className={inputcss()} defaultValue={ingredient?.primePrice} id="unitPrice-input" required/>
                    </td>
                  </tr>
                  <tr>
                    <th scope="col" className="px-1 py-1 ">구매단위</th>
                    <td className="whitespace-nowrap px-1 py-1 ">
                      <input type="number" className={inputcss()} defaultValue={ingredient?.unitQuantity} id="unitQuantity-input" required/>
                    </td>
                  </tr>
                  <tr>
                    <th scope="col" className="px-1 py-1 ">소비 기한</th>
                    <td className="whitespace-nowrap px-1 py-1 ">
                      <input type="number" className={inputcss()} defaultValue={ingredient?.expiredPeriod} id="expiredPeriod-input"
                             required/>
                    </td>
                  </tr>
                  <tr>
                    <th scope="col" className="px-1 py-1 ">안심수량</th>
                    <td className="whitespace-nowrap px-1 py-1 ">
                      <input type="number" className={inputcss()} defaultValue={ingredient?.relievedQuantity} id="relievedQuantity-input"
                             required/>
                    </td>
                  </tr>
                  <tr>
                    <th scope="col" className="px-1 py-1 ">구매 링크</th>
                    <td className="whitespace-nowrap px-1 py-1 ">
                      <input type="text" className={inputcss()} defaultValue={ingredient?.url} id="url-input"/>
                    </td>
                  </tr>
                  </thead>
                </table>
              </div>
            </div>
          </>
          :
          <>
            <div className="flex justify-center flex-col mt-[20rem] items-left ml-[10rem]">
              <div className="w-full overflow-x-auto sm:-mx-6 lg:-mx-8 border-4 rounded-md px-4 py-4 bg-white">
                <div className="flex float-right">
                  <button className={buttonDesign()} onClick={putIngredient}>수정</button>
                  <button className={eraseButtonDesign()} onClick={() => {
                    setMod(false);
                  }}>취소
                  </button>
                </div>
                <table className="min-w-full text-center text-sm font-light border-t-2 border-black bg-white">
                  <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800 ">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-center">
                      재료명
                    </th>
                    <th scope="col" className=" px-6 py-4 text-center">
                      남은 재고
                    </th>
                    <th scope="col" className=" px-6 py-4 text-center">
                      구매 링크
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap  px-6 py-4 font-medium text-center">
                      <input type="text" id="name-input" className={inputcss()} required
                             defaultValue={ingredient?.name}/>
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4 text-center">
                      <input
                          type="number"
                          id="remainQuantity-input"
                          className={inputcss()}
                          defaultValue={ingredient?.remainQuantity}
                          required
                      />
                      <select className="py-2 border border-gray-300 rounded" id="units-input" required
                              defaultValue={ingredient?.units}>
                        <option value="g">g</option>
                        <option value="ea">ea</option>
                        <option value="ml">ml</option>
                      </select>
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4 text-center">
                      <input type="text" className={inputcss()} id="url-input" defaultValue={ingredient?.url}/>
                    </td>
                  </tr>
                  </tbody>

                  <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800 ">
                  <tr>
                    <th scope="col" className=" px-6 py-4 text-center">
                      구매 날짜
                    </th>
                    <th scope="col" className=" px-6 py-4 text-center mr-4">
                      재고 경고량
                    </th>
                    <th scope="col" className=" px-6 py-4 text-center mr-4">
                      구매 가격(원가)
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap  px-6 py-4 text-center">
                      <input type="date" className={inputcss()} defaultValue={today} id="buyDate-input" required/>
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4 text-center">
                      <input
                          type="number"
                          className={inputcss()}
                          id="alertQuantity-input"
                          defaultValue={ingredient?.alertQuantity}
                          required
                      /><span className="px-3 py-2.5 border border-gray-300 rounded">원</span>
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4 text-center">
                      <input
                          type="number"
                          className={inputcss()}
                          id="unitPrice-input"
                          defaultValue={ingredient?.unitPrice}
                          required
                      />
                    </td>
                  </tr>
                  </tbody>

                  <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800 ">
                  <tr>
                    <th scope="col" className=" px-6 py-4 text-center mr-4">
                      구매 묶음 양
                    </th>
                    <th scope="col" className=" px-6 py-4 text-center mr-4">
                      소비 기한
                    </th>
                    <th scope="col" className=" px-6 py-4 text-center mr-4">
                      이상적인 양
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap  px-6 py-4 text-center">
                      <input
                          type="number"
                          className={inputcss()}
                          id="unitQuantity-input"
                          defaultValue={ingredient?.unitQuantity}
                          required
                      />
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4 text-center">
                      <input
                          type="number"
                          className={inputcss()}
                          id="expiredPeriod-input"
                          defaultValue={ingredient?.expiredPeriod}
                          required
                      />
                      <span className="px-3 py-2.5 border border-gray-300 rounded">일</span>
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4 text-center">
                      <input
                          type="number"
                          className={inputcss()}
                          id="relievedQuantity-input"
                          defaultValue={ingredient?.relievedQuantity}
                          required
                      />
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
      }
    </div>
  );
};
