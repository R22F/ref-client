import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {CalendarBox, EmailBox, ErrorClass, IdBox, PwBox,} from "../inputBox/inputBox";
import {AxiosInstance} from "axios";
import {useAxiosInstanceNoToken} from "../../Axios/api";

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
  // const err: ErrorClass = new ErrorClass();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBrith] = useState("");
  const [invalidReasonText, setInvalidReasonText] = useState("");

  const [err, setErr] = useState(new ErrorClass());

  /**
   * 제출 버튼 함수.
   * @param e 리랜더링을 멈추기 위한 기법으로 잠시 사용
   */
  const instance: AxiosInstance = useAxiosInstanceNoToken();

  const submitClick = (e: any) => {
    if (!err.isValid()) {
      setInvalidReasonText(err.getMessage());
      console.log(err);
      e.preventDefault();
      return false;
    }

    const SignUpData = {
      username: id,
      password: pw,
      // name: name,
      email: email,
      birth: birth,
    };

    instance
      .post("/signup", SignUpData)
      .then((response) => {
        // 응답 처리 로직 작성
        alert("회원가입에 성공하였습니다.");
        navigate("/");
      })
      .catch((error) => {
        // 에러 처리 로직 작성
        console.error(error);
        alert("회원가입에 실패하였습니다.");
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
