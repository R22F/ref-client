import { useState } from "react";
import { Link } from "react-router-dom";

export const SignInBox = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const submitClick = () => {
    console.log(id, pw);
  };

  const labelfont = () => {
    return "block text-gray-700 mb-2 hover:text-red-400 font-semibold";
  };
  const inputcss = () => {
    return "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-300 mb-4 focus:border-2";
  };

  return (
    <div className=" w-[15rem] h-[17rem]">
      <label htmlFor="id" className={labelfont()}>
        ID
      </label>
      <input
        onChange={(e) => {
          setId(e.target.value);
        }}
        id="id"
        className={inputcss()}
      />

      <label htmlFor="pw" className={labelfont()}>
        Password
      </label>
      <input
        type="password"
        onChange={(e) => {
          setPw(e.target.value);
        }}
        id="pw"
        className={inputcss()}
      />

      <div className="flex justify-between mb-4">
        <Link to="/SignUp" className={labelfont()}>
          ID/PW 찾기
        </Link>
        <Link to="/SignUp" className={labelfont()}>
          회원가입
        </Link>
      </div>

      <div className="flex items-center">
        <button
          onClick={submitClick}
          className="bg-gray-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded hover:shadow-lg whitespace-nowrap ml-auto"
        >
          로그인
        </button>
      </div>
    </div>
  );
};
