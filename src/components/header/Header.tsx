import { useEffect, useState } from "react";
import { TotalGNB } from "../GNB/TotalGNB";
export const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const handleLogin = () => {
    setIsLogin(!isLogin);
  };
  useEffect(() => {}, [isLogin]);
  const logInButtonColor = (isLogin: boolean) => {
    return isLogin === true
      ? "bg-red-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded whitespace-nowrap"
      : "bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded hover:shadow-lg whitespace-nowrap";
  };

  return (
    <>
      <div className="flex justify-between">
        <TotalGNB />
        <div className="flex items-center mr-4">
          <div className=" pr-4">{isLogin ? "OOO님 안녕하세요!" : ""}</div>
          <button onClick={handleLogin} className={logInButtonColor(isLogin)}>
            {isLogin ? "LOG OUT" : "LOG IN"}
          </button>
        </div>
      </div>
      {/* <Button variant="contained" style={{"background":"red"}}>test button</Button> */}
    </>
  );
};
