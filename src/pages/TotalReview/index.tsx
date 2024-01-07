import {useEffect, useState} from "react";
import {DayCount} from "../../components/databox/DayCount";
import {TotalData} from "../../components/databox/TotalData";
import {checkTokenValidate, useAxiosInstance} from "../../Axios/api";
import {useRecoilState, useRecoilValue} from "recoil";
import {foodData, isLoginModalOpen, isMobile} from "../../recoil/DBAtom";

export const TotalReview = () => {
  const [selectedDate, setSelectedDate] = useState(DayCount());
  const [text, setText] = useState("일일");
  const [income, setIncome] = useState(0);
  const [primePrice, setPrimePrice] = useState(0);
  const [bestMenu, setBestMenu] = useState({name:"", count:0});
  const [worstMenu, setWorstMenu] = useState({name:"", count:0});
  const instance = useAxiosInstance()
  const [foods, setFoods] = useRecoilState(foodData);
  const [, setIsModalOpen] = useRecoilState(isLoginModalOpen);
  const isMobileState = useRecoilValue(isMobile)

  useEffect(() => {
    fetchData(parseISODate(getKSTtime())).then()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    findBestAndWorstMenu()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foods]);

  const fetchData = async (startDate:string, endDate?:string) => {
    try {
      const response = await instance.get(`/settlement/?startDate=${startDate}&endDate=${endDate?endDate:startDate}`)
      setFoods(response.data.foods)
      setIncome(response.data.sum)
      setPrimePrice(response.data.primePrice)
    } catch (err) {
      checkTokenValidate(err, setIsModalOpen)
    }
  };

  const getKSTtime = () => {
    return new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
  }

  const findBestAndWorstMenu = () => {
    if (foods.length === 0)
      return
    let minCountObject = foods[0];
    let maxCountObject = foods[0];

    for (let i = 1; i < foods.length; i++) {
      const currentObject = foods[i];

      if (currentObject.count < minCountObject.count) {
        minCountObject = currentObject;
      }

      if (currentObject.count > maxCountObject.count) {
        maxCountObject = currentObject;
      }
    }
    setBestMenu(maxCountObject)
    setWorstMenu(minCountObject)
  }

  const parseISODate = (date:Date) => {
    return date.toISOString().substring(0,10)
  }

  const handleText = (e: any) => {
    const id = e.currentTarget.id;
    const today =  getKSTtime();
    let startDate:string = "";
    const endDate = parseISODate(today);
    console.log(endDate)
    switch (id){
      case "일일":
        startDate = selectedDate
        break;
      case "월간":
        startDate = parseISODate(new Date(today.getFullYear(), today.getMonth(), 2));
        break;
      case "연간":
        startDate = parseISODate(new Date(today.getFullYear(), 0, 2));
        break;
      case "총계":
        startDate = parseISODate(new Date(2022-1-1));
        break;
    }
    fetchData(startDate, endDate).then(()=>setText(id))
  };
  useEffect(() => {}, [text]);
  const handleDateChange = (event: any) => {
    const value = event.target.value
    setSelectedDate(value);
    setText("일일")
    fetchData(value, value)
  };

  const buttonDesign = (_text: string) => {
    if (isMobileState)
      return text === _text
          ? "bg-red-400 border-red-100 text-red-100 font-semibold py-1 px-1 border rounded shadow ml-1"
          : "bg-white hover:bg-red-500 hover:border-red-200 hover:text-red-200 text-red-400 font-semibold py-1 px-1 border border-red-400 rounded shadow ml-1";
    else
      return text === _text
        ? "bg-red-400 border-red-100 text-red-100 font-semibold py-2 px-4 border rounded shadow ml-4"
        : "bg-white hover:bg-red-500 hover:border-red-200 hover:text-red-200 text-red-400 font-semibold py-2 px-4 border border-red-400 rounded shadow ml-4";
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-between mt-16 items-center ">
        <div className="flex justify-center items-center">
          <div>
            <button id="일일" onClick={handleText} className={buttonDesign("일일")}>일일</button>
            <button id="월간" onClick={handleText} className={buttonDesign("월간")}>월간</button>
            <button id="연간" onClick={handleText} className={buttonDesign("연간")}>연간</button>
            <button id="총계" onClick={handleText} className={buttonDesign("총계")}>총계</button>
          </div>

          <div>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="appearance-none border rounded py-2 px-2 leading-tight focus:outline-none focus:shadow-outline text-red-400 flex-grow ml-2.5"
            ></input>
          </div>
        </div>
        <div className="justify-around pt-[1rem] pb-4 w-full">
          <div className="flex w-[10rem] justify-around ml-auto text-red-400 font-semibold ">
            <div>{text === "총계" ? "총" : text} 원가 :</div>
            <div>{primePrice.toLocaleString()}</div>
            <>원</>
          </div>
          <div className="flex w-[10rem] justify-around ml-auto text-red-400 font-semibold mb-4">
            <div>{text === "총계" ? "총" : text} 수익 :</div>
            <div>{income.toLocaleString()}</div>
            <>원</>
          </div>
          {isMobileState?
            <>
              <div className="w-[20rem] flex m-auto my-1 py-1 justify-around  bg-red-400 shadow-md rounded-md text-red-100 font-semibold items-center">
                <div className="ml-2 w-[10rem]">BEST MENU!!</div>
                <div className="w-[10rem]">
                  {bestMenu.name} <>{bestMenu.count}</>개
                </div>
              </div>
              <div className="w-[20rem] flex m-auto my-1 py-1 justify-around bg-gray-500 shadow-md rounded-md text-gray-200 font-semibold items-center">
                <div className="ml-2 w-[10rem]">WORST MENU..</div>
                <div className="w-[10rem]">
                  {worstMenu.name} <>{worstMenu.count}</>개
                </div>
              </div>
            </>
              :
            <>
              <div className="flex m-auto my-1 py-1 justify-around  bg-red-400 shadow-md rounded-md text-red-100 font-semibold items-center">
                <div className="ml-2 w-[10rem]">BEST MENU!!</div>
                <div className="w-[10rem]">
                  {bestMenu.name} <>{bestMenu.count}</>개
                </div>
              </div>
              <div className="flex m-auto my-1 py-1 justify-around bg-gray-500 shadow-md rounded-md text-gray-200 font-semibold items-center">
                <div className="ml-2 w-[10rem]">WORST MENU..</div>
                <div className="w-[10rem]">
                  {worstMenu.name} <>{worstMenu.count}</>개
                </div>
              </div>
            </>
          }
        </div>
        <TotalData />
      </div>
    </div>
  );
};
