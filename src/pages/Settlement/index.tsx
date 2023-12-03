import {SettleDatabox} from "../../components/databox/SettleDatabox";
import {DayCount} from "../../components/databox/DayCount";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {foodData, settlementDate, totalPriceSet,} from "../../recoil/DBAtom";
import {SettlementData} from "../../interface/DataInterface";
import {useAxiosInstance} from "../../Axios/api";

export const Settlement = () => {
  const [selectedDate, setSelectedDate] = useState(DayCount());
  const isLogin = localStorage.getItem("Authorization") !== null;
  const navigate = useNavigate();
  const [, setSettleDate] = useRecoilState(settlementDate);
  const foods = useRecoilValue(foodData);
  const totalPrice = useRecoilValue(totalPriceSet);

  const instance = useAxiosInstance();

  const handleDateChange = (event: any) => {
    setSelectedDate(event.target.value);
    setSettleDate(event.target.value);
  };

  useEffect(() => {
    if (!isLogin) {
      alert("로그인이 필요한 접근입니다.");
      navigate("/");
    }
    setSettleDate(DayCount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  interface settleData {
    sum: number;
    foods: SettlementData[];
  }

  const handleSettlement = () => {
    const data: settleData = {
      sum: totalPrice,
      foods: foods,
    };
    console.log(data);

    instance
      .post("settlement", data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center">
      {isLogin ? (
        <div className="flex flex-col justify-between mt-28 items-center">
          <div className="flex justify-between items-center ml-auto mb-4">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow"
            />

            <button
              onClick={handleSettlement}
              className="bg-white hover:bg-red-400 hover:border-red-100 hover:text-red-100 text-red-400 font-semibold py-2 px-4 border border-red-400 rounded shadow ml-4"
            >
              정산
            </button>
          </div>
          <SettleDatabox />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
