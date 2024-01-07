import {useEffect, useState} from "react";
import {TotalGNB} from "../GNB/TotalGNB";
import axios, {AxiosInstance} from "axios";
import {hasToken} from "../auth/HasToken";
import {useRecoilState, useRecoilValue} from "recoil";
import {isLoginModalOpen, isMobile} from "../../recoil/DBAtom";
import {SignModal} from "./SignModal";
import {RouteConst} from "../../interface/RouteConst";
import {useNavigate} from "react-router-dom";

export const Header = () => {
    const image = require("./cookingman.png")
    const [isLogin, setIsLogin] = useState(hasToken()); //리코일 DBAtom 페이지에 새 atom 생성 후 불러오기
    const [isModalOpen, setIsModalOpen] = useRecoilState(isLoginModalOpen);
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const isMobileState = useRecoilValue(isMobile)
    const navigate = useNavigate()

    useEffect(() => {
        setIsLogin(hasToken)
    }, [isLogin, isModalOpen]);

    const logInButtonColor = (isLogin: boolean, isMobile: boolean) => {
        if (isMobile)
            return isLogin
                ? "bg-gray-400 hover:bg-white hover:border-gray-300 hover:text-gray-400 text-white font-semibold py-1 px-1 border border-gray-400 rounded shadow mr-auto"
                : "bg-white hover:bg-red-400 hover:border-red-100 hover:text-red-100 text-red-400 font-semibold py-1 px-1 border border-red-400 rounded shadow ml-4 ml-auto";
        else
            return isLogin
                ? "bg-gray-400 hover:bg-white hover:border-gray-300 hover:text-gray-400 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-auto"
                : "bg-white hover:bg-red-400 hover:border-red-100 hover:text-red-100 text-red-400 font-semibold py-2 px-4 border border-red-400 rounded shadow ml-4 ml-auto";
    };

    const instance: AxiosInstance = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL,
        headers: {},
    });

    const signInHandler = async (tempValue?: any) => {
        interface SigninData {
            username: string;
            password: string;
        }

        const signinData: SigninData = {
            username: "",
            password: "",
        };

        signinData.username = tempValue.id !== undefined ? tempValue.id : id;
        signinData.password = tempValue.pw !== undefined ? tempValue.pw : pw;

        await instance
            .post("/signin", signinData)
            .then((response) => {
                setIsModalOpen(false);
                const responseToken = response.headers.authorization;
                const token = responseToken.split(" ")[1];

                localStorage.setItem("Authorization", token);
                localStorage.setItem("Username", signinData.username);
                setIsLogin(true);
            })
            .catch((error) => {
                console.error("에러:", error);
                alert("로그인에 실패했습니다.");
            });
    };

    function WelcomeMessage() {
        return <div
            className=" pr-4 pl-4">
            {localStorage.getItem("Authorization") !== null ?
                <>{localStorage.getItem("Username")}님 안녕하세요!</>
                : ""
            }
        </div>;
    }

    function LogInOrOutButton({isMobile}:{isMobile:boolean}) {
        return <button
            onClick={() => {
                if (isLogin && window.confirm("로그아웃 하시겠습니까?")) {
                    localStorage.clear();
                    setIsLogin(hasToken());
                } else if (!isLogin) {
                    setIsModalOpen(true);
                }
            }}
            className={logInButtonColor(isLogin, isMobile)}
        >
            {isLogin ? "LOG OUT" : "LOG IN"}
        </button>;
    }

    return (
        <>
            <div>
                <div className="flex float-left m-5">
                    <p className="mr-1 flex text-5xl text-red-400 font-light"
                        onClick={()=>navigate(RouteConst.HomePage)} // 추후 이 동작으로 변경 되어야 함
                    >REF</p>
                    <img className="min-w-7 min-h-7 max-w-7 max-h-7"
                         src={image}
                         alt="logo"
                         onClick={() => signInHandler({id: "string", pw: "string"}).then()}
                    />
                </div>

                {isMobileState?
                    <>
                        <div className="flex items-center float-right mb-10 p-[1rem] py-6">
                            <LogInOrOutButton isMobile={isMobileState}/>
                            <SignModal
                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen}
                                setId={setId}
                                setPw={setPw}
                                signInHandler={signInHandler}
                            />
                        </div>
                        <div className="clear-both">
                            <TotalGNB/>
                        </div>
                    </>
                    :
                    <>
                        <div className="flex items-center float-right mb-10 p-[1rem]">
                            <WelcomeMessage/>
                            <LogInOrOutButton isMobile={isMobileState}/>
                            <SignModal
                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen}
                                setId={setId}
                                setPw={setPw}
                                signInHandler={signInHandler}
                            />
                        </div>
                        <div className="clear-both">
                            <TotalGNB/>
                        </div>
                    </>
                }
            </div>
        </>
    );
};
