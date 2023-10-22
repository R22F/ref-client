import { useEffect, useState } from "react";
import { TotalGNB } from "../GNB/TotalGNB";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosInstance } from "axios";
import { AuthorizedToken, Login } from "../../recoil/DBAtom";
import { useRecoilState } from "recoil";

export const Header = () => {
  const [isLogin, setIsLogin] = useRecoilState(Login); //리코일 DBAtom 페이지에 새 atom 생성 후 불러오기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useRecoilState(AuthorizedToken);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  useEffect(() => {}, [isLogin]);

  const logInButtonColor = (isLogin: boolean) => {
    return isLogin === true
      ? "bg-gray-400 hover:bg-white hover:border-gray-300 hover:text-gray-400 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-auto"
      : "bg-white hover:bg-red-400 hover:border-red-100 hover:text-red-100 text-red-400 font-semibold py-2 px-4 border border-red-400 rounded shadow ml-4 ml-auto";
  };
  const labelfont = () => {
    return "block text-gray-700 mb-2 hover:text-red-400 font-semibold";
  };
  const inputcss = () => {
    return "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-300 mb-4 focus:border-2";
  };
  const instance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {},
  });
  const signinHandler = async () => {
    interface SigninData {
      username: string;
      password: string;
    }

    const signinData: SigninData = {
      username: "",
      password: "",
    };
    signinData.username = id;
    signinData.password = pw;

    await instance
      .post("/signin", signinData)
      .then((response) => {
        setIsModalOpen(false);
        setIsLogin(true);
        const responseToken = response.headers.authorization;
        const token = responseToken.split(" ")[1];

        navigate("/");
        setToken(token);
      })
      .catch((error) => {
        console.error("에러:", error);
        alert("로그인에 실패했습니다.");
      });
  };
  // 임시 로그인 버튼 함수
  const tempsigninHandler = async () => {
    interface SigninData {
      username: string;
      password: string;
    }

    const signinData: SigninData = {
      username: "",
      password: "",
    };
    signinData.username = "string";
    signinData.password = "string";

    await instance
      .post("/signin", signinData)
      .then((response) => {
        setIsModalOpen(false);
        setIsLogin(true);
        const responseToken = response.headers.authorization;
        const token = responseToken.split(" ")[1];

        setToken(token);
      })
      .catch((error) => {
        console.error("에러:", error);
        alert("로그인에 실패했습니다.");
      });
  };

  return (
    <>
      <div className="flex justify-between">
        <TotalGNB />
        <div className="flex items-center mr-4">
          <button
            className={logInButtonColor(false)}
            onClick={() => {
              tempsigninHandler();
            }}
          >
            임시로그인
          </button>
          <button
            className={logInButtonColor(false)}
            onClick={() => {
              console.log(token);
            }}
          >
            토큰 확인
          </button>
          <div className=" pr-4">{isLogin ? "OOO님 안녕하세요!" : ""}</div>
          <button
            onClick={() => {
              if (isLogin) {
                alert("로그아웃 완료!");
                setToken("");
                setIsLogin(false);
              } else {
                setIsModalOpen(true);
              }
            }}
            className={logInButtonColor(isLogin)}
          >
            {isLogin ? "LOG OUT" : "LOG IN"}
          </button>
          {isModalOpen && (
            <div
              className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center "
              style={{ backgroundColor: "rgba(128, 128, 128, 0.5)" }}
            >
              <div className="absolute bg-white shadow-lg rounded-lg">
                <div className="modal-header px-4 py-3">
                  <div className="flex justify-end items-center">
                    <button
                      className="text-gray-400  hover:text-red-700"
                      onClick={() => {
                        setIsModalOpen(false);
                      }}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex justify-center items-center">
                    <h2 className="text-lg font-medium text-red-400 font-semibold">
                      로그인
                    </h2>
                  </div>
                </div>
                <div className="modal-body p-4">
                  <div className=" w-[15rem] h-[17rem]">
                    <label htmlFor="id-input" className={labelfont()}>
                      ID
                    </label>
                    <input
                      onChange={(e) => {
                        setId(e.target.value);
                      }}
                      id="id-input"
                      className={inputcss()}
                    />

                    <label htmlFor="pw-input" className={labelfont()}>
                      Password
                    </label>
                    <input
                      type="password"
                      onChange={(e) => {
                        setPw(e.target.value);
                      }}
                      id="pw-input"
                      className={inputcss()}
                    />

                    <div className="flex justify-between mb-4">
                      <Link
                        to="/SignUp"
                        className={labelfont()}
                        onClick={() => {
                          setIsModalOpen(false);
                        }}
                      >
                        ID/PW 찾기
                      </Link>
                      <Link
                        to="/SignUp"
                        className={labelfont()}
                        onClick={() => {
                          setIsModalOpen(false);
                        }}
                      >
                        회원가입
                      </Link>
                    </div>

                    <div className="flex items-center">
                      <button
                        className="bg-gray-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded hover:shadow-lg whitespace-nowrap ml-auto"
                        onClick={signinHandler}
                      >
                        로그인
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
