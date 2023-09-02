import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import { RouteConst } from "../../interface/RouteConst";

export const TotalGNB = () => {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "bg-white inline-block border-b-4 border-gray-300 rounded-t py-2 px-4 text-red-500 font-semibold"
      : "bg-white inline-block py-2 px-4 text-gray-400 hover:text-red-800 font-semibold";
  };
  const getLiClass = (path: string) => {
    return location.pathname === path ? "-mb-px mr-1" : "mr-1";
  };

  return (
    <ul className="flex mt-2 ml-4">
      <li className={getLiClass(RouteConst.HomePage)}>
        <Link
          to={RouteConst.HomePage}
          className={getLinkClass(RouteConst.HomePage)}
        >
          이미지자리
        </Link>
      </li>
      <li className={getLiClass(RouteConst.settlement)}>
        <Link
          to={RouteConst.settlement}
          className={getLinkClass(RouteConst.settlement)}
        >
          정산페이지
        </Link>
      </li>
      <li className={getLiClass(RouteConst.TotalReview)}>
        <Link
          to={RouteConst.TotalReview}
          className={getLinkClass(RouteConst.TotalReview)}
        >
          결산내역
        </Link>
      </li>
      <li className={getLiClass(RouteConst.Inventory)}>
        <Link
          to={RouteConst.Inventory}
          className={getLinkClass(RouteConst.Inventory)}
        >
          냉장고 재고 현황
        </Link>
      </li>
      <li className={getLiClass(RouteConst.CookingDB)}>
        <Link
          to={RouteConst.CookingDB}
          className={getLinkClass(RouteConst.CookingDB)}
        >
          요리별 DB
        </Link>
      </li>
    </ul>
    // <Button variant="contained" sx={{ mx: 2 }}>
    //   <Link to={RouteConst.HomePage}>이미지자리</Link>
    // </Button>
    // <Button variant="contained" sx={{ mx: 2 }}>
    //   <Link to={RouteConst.settlement}>정산페이지</Link>
    // </Button>
    // <Button variant="contained" sx={{ mx: 2 }}>
    //   <Link to={RouteConst.TotalReview}>결산내역 조회</Link>
    // </Button>
    // <Button variant="contained" sx={{ mx: 2 }}>
    //   <Link to={RouteConst.Inventory}>냉장고 재고 현황</Link>
    // </Button>
    // <Button variant="contained" sx={{ mx: 2 }}>
    //   <Link to={RouteConst.CookingDB}>요리별 DB</Link>
    // </Button>

    //     <ul class="flex border-b">
    //   <li class="-mb-px mr-1">
    //     <a class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#">Active</a>
    //   </li>
    //   <li class="mr-1">
    //     <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">Tab</a>
    //   </li>
    //   <li class="mr-1">
    //     <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">Tab</a>
    //   </li>
    //   <li class="mr-1">
    //     <a class="bg-white inline-block py-2 px-4 text-gray-400 font-semibold" href="#">Tab</a>
    //   </li>
    // </ul>
  );
};
