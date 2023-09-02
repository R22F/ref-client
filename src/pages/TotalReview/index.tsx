import { useEffect, useState } from "react";
import { DayCount } from "../../components/databox/DayCount";
import { TotalData } from "../../components/databox/TotalData";

export const TotalReview = () => {
  const [selectedDate, setSelectedDate] = useState(DayCount());
  const [text, setText] = useState("일일");

  const handleText = (e: any) => {
    const id = e.currentTarget.id;
    setText(id);
  };
  useEffect(() => {
    console.log(text);
  }, [text]);
  const handleDateChange = (event: any) => {
    setSelectedDate(event.target.value);
  };

  const buttonDesign = (_text: string) => {
    return text === _text
      ? "bg-white bg-red-400 border-red-100 text-red-100 font-semibold py-2 px-4 border rounded shadow ml-4"
      : "bg-white hover:bg-red-500 hover:border-red-200 hover:text-red-200 text-red-400 font-semibold py-2 px-4 border border-red-400 rounded shadow ml-4";
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-between mt-16 items-center ">
        <div className="flex justify-between items-center mb-4 w-full">
          <div>
            <button
              id="일일"
              onClick={handleText}
              className={buttonDesign("일일")}
            >
              일일
            </button>
            <button
              id="월간"
              onClick={handleText}
              className={buttonDesign("월간")}
            >
              월간
            </button>
            <button
              id="연간"
              onClick={handleText}
              className={buttonDesign("연간")}
            >
              연간
            </button>
            <button
              id="총계"
              onClick={handleText}
              className={buttonDesign("총계")}
            >
              총계
            </button>
          </div>

          <div>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-red-400 flex-grow"
            ></input>
          </div>
        </div>
        <div className="justify-around pt-[1rem] pb-4 w-full">
          <div className="flex w-[10rem] justify-around ml-auto text-red-400 font-semibold ">
            <div>{text === "총계" ? "총" : text} 원가 :</div>
            <div>val</div>
            <>원</>
          </div>
          <div className="flex w-[10rem] justify-around ml-auto text-red-400 font-semibold mb-4">
            <div>{text === "총계" ? "총" : text} 수익 :</div>
            <div>val</div>
            <>원</>
          </div>

          {text !== "일일" ? (
            <>
              <div className="flex my-1 py-1 justify-around  bg-red-400 shadow-md rounded-md text-red-100 font-semibold items-center">
                <div className="w-[10rem]">BEST MENU!!</div>
                <div className="w-[10rem]">
                  우삼겹파스타 <>300</>개
                </div>
              </div>
              <div className="flex my-1 py-1 justify-around  bg-gray-500 shadow-md rounded-md text-gray-200 font-semibold items-center">
                <div className="w-[10rem]">WORST MENU..</div>
                <div className="w-[10rem]">
                  버섯전골 <>1</>개
                </div>
              </div>
            </>
          ) : null}
        </div>
        <TotalData />
      </div>
    </div>
  );
};
