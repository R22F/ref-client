import {Link, useLocation} from "react-router-dom";
import {RouteConst} from "../../interface/RouteConst";
import {hasToken} from "../auth/HasToken";
import {useRecoilValue} from "recoil";
import {isMobile} from "../../recoil/DBAtom";

export const TotalGNB = () => {
    const location = useLocation();
    const isMobileState = useRecoilValue(isMobile)

    const getLinkClass = (path: string) => {
        return location.pathname === path
            ? "bg-white inline-block border-b-4 border-gray-300 rounded-t py-2 px-4 text-red-400 font-semibold whitespace-nowrap"
            : "bg-white inline-block py-2 px-4 text-gray-400 hover:text-red-500 font-semibold whitespace-nowrap";
    };
    const getLiClass = (path: string) => {
        return location.pathname === path ? "-mb-px mr-1" : "mr-1";
    };

    const HeaderButton = ({route, name}: {
        route: RouteConst,
        name: string
    }) => {
        return (
            <li className={getLiClass(route)}>
                <Link
                    to={route}
                    className={getLinkClass(route)}
                >
                    {name}
                </Link>
            </li>
        )
    }

    return (
        <ul>
            {isMobileState?
                <div className="flex w-full justify-center">
                    <HeaderButton
                        route={RouteConst.HomePage}
                        name={"메인"}/>
                    {hasToken() ?
                        <>
                            <HeaderButton
                                route={RouteConst.settlement}
                                name={"정산"}/>
                            <HeaderButton
                                route={RouteConst.TotalReview}
                                name={"결산"}/>
                            <HeaderButton
                                route={RouteConst.Inventory}
                                name={"냉장고"}/>
                            <HeaderButton
                                route={RouteConst.CookingDB}
                                name={"요리 "}/>
                        </>
                        :
                        <></>
                    }
                </div>
                :
                <div className="flex mt-2 ml-4">
                    <HeaderButton
                        route={RouteConst.HomePage}
                        name={"메인"}/>
                    {hasToken() ?
                        <>
                            <HeaderButton
                                route={RouteConst.settlement}
                                name={"정산페이지"}/>
                            <HeaderButton
                                route={RouteConst.TotalReview}
                                name={"결산내역"}/>
                            <HeaderButton
                                route={RouteConst.Inventory}
                                name={"냉장고 재고 현황"}/>
                            <HeaderButton
                                route={RouteConst.CookingDB}
                                name={"요리 레시피"}/>
                        </>
                        :
                        <></>
                    }
                </div>
            }
        </ul>
    );
};

