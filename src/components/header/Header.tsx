import {TotalGNB} from "../GNB/TotalGNB";
import {useRecoilState, useRecoilValue} from "recoil";
import {isLoginModalOpen, isMobile} from "../../recoil/DBAtom";
import {SignModal} from "./SignModal";
import {RouteConst} from "../../interface/RouteConst";
import {useNavigate} from "react-router-dom";

export const Header = () => {
    const image = require("./cookingman.png")
    const [isModalOpen, setIsModalOpen] = useRecoilState(isLoginModalOpen);
    const navigate = useNavigate()
    const isMobileState = useRecoilValue(isMobile)

    function WelcomeMessage() {
        return (
            <div className=" pr-4 pl-4">
                {localStorage.getItem("Authorization") !== null ?
                    <>{localStorage.getItem("Username")}님 안녕하세요!</>
                    :
                    ""
                }
            </div>
        )
    }

    return (
            <>
                <div className="flex float-left m-5"
                     onClick={()=>navigate(RouteConst.HomePage)}>
                    <p className="mr-1 flex text-5xl text-red-400 font-light">REF</p>
                    <img className="min-w-7 min-h-7 max-w-7 max-h-7" src={image} alt="logo"/>
                </div>
                {isMobileState?
                    <>
                        <div className="flex items-center float-right mb-10 p-[1rem] py-6">
                            <SignModal
                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen}
                                isMobileState={isMobileState}
                            />
                        </div>
                        <div className="clear-both"><TotalGNB/></div>
                    </>
                    :
                    <>
                        <div className="flex items-center float-right mb-10 p-[1rem]">
                            <WelcomeMessage/>
                            <SignModal
                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen}
                                isMobileState={isMobileState}
                            />
                        </div>
                        <div className="clear-both"><TotalGNB/></div>
                    </>
                }
            </>
    );
};
