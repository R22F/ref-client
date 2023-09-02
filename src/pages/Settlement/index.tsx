import Button from '@mui/material/Button';
import { SettleDatabox } from '../../components/databox/SettleDatabox';
import { DayCount } from '../../components/databox/DayCount';
import { useState } from 'react';

export const Settlement = () => {
  const [selectedDate, setSelectedDate] = useState(DayCount());

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-evenly mt-28">
        <div className="flex absolute w-52 justify-between top-[8rem] right-[11rem]">
          <input type="date" value={selectedDate} onChange={handleDateChange}></input>
          <Button variant="contained">정산</Button>
        </div>
        <SettleDatabox />
      </div>
    </div>
  );
};
