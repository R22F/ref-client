import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarBox,
  EmailBox,
  ErrorClass,
  IdBox,
  NameBox,
  PwBox,
} from "../inputBox/inputBox";

export const submitButton = () => {
  return "bg-white hover:bg-red-400 hover:border-red-100 hover:text-red-100 text-red-400 font-semibold py-2 px-4 border border-red-400 rounded shadow ml-4 ml-auto";
};
export const cancleButton = () => {
  return "bg-white hover:bg-gray-400 hover:border-gray-100 hover:text-gray-100 text-gray-400 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-auto";
};

/**
 * 회원가입 입력상자 컴포넌트
 * @returns
 */
export const SignUpBox = () => {
  // 임시 api url
  const [apiUrl, setApiUrl] = useState("");
  // const err: ErrorClass = new ErrorClass();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBrith] = useState("");
  const [invalidReasonText, setInvalidReasonText] = useState("");

  const [err, setErr] = useState(new ErrorClass());

  /**
   * 제출 버튼 함수.
   * @param e 리랜더링을 멈추기 위한 기법으로 잠시 사용
   */
  const submitClick = (e: any) => {
    setApiUrl("https://server-ref.kro.kr/v1/test");
    console.log(err);
    if (!err.isValid()) {
      setInvalidReasonText(err.getMessage());
      return false;
    }

    const SingUpData = {
      id: id,
      pw: pw,
      name: name,
      email: email,
      birth: birth,
    };

    // 추후 api url 변경 필요
    fetch(apiUrl, {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(SingUpData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json;
        } else {
          throw new Error("회원가입에 실패했습니다.");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    e.preventDefault();
    return true;
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm  ">
        <h2 className="mt-10 mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-400">
          회원 가입
        </h2>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm ">
        <form>
          <IdBox SetValue={setId} error={[err, setErr]} />
          <PwBox SetValue={setPw} error={[err, setErr]} />
          <NameBox SetValue={setName} error={[err, setErr]} />
          <CalendarBox SetValue={setBrith} error={[err, setErr]} />
          <EmailBox SetValue={setEmail} error={[err, setErr]} />
          <div>{invalidReasonText}</div>
          <div className="flex flex-col mt-10">
            <div className="flex items-center">
              <Link to="/" className={cancleButton()}>
                취소
              </Link>
              <button onClick={submitClick} className={submitButton()}>
                등록
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
