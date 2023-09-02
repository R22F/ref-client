import { SettleDatabox } from "../../components/databox/SettleDatabox";
import { DayCount } from "../../components/databox/DayCount";
import { useState } from "react";

export const Settlement = () => {
  const [selectedDate, setSelectedDate] = useState(DayCount());

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-between mt-28 items-center">
        <div className="flex justify-between items-center ml-auto mb-4">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-red-400 flex-grow"
          />
          <button className="bg-white hover:bg-red-400 hover:border-red-100 hover:text-red-100 text-red-400 font-semibold py-2 px-4 border border-red-400 rounded shadow ml-4">
            정산
          </button>
        </div>
        <SettleDatabox />
      </div>
    </div>
  );
};
