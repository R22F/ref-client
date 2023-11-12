import {useEffect, useState} from "react";
import {DBBox} from "../../components/databox/DBBox";
import {useRecoilState} from "recoil";
import {DBAtom, Options,} from "../../recoil/DBAtom";
import {useAxiosInstance} from "../../Axios/api";
import {AddRecipe} from "./addRecipe";
import {ModifyRecipe} from "./ModifyRecipe";

interface InventoryData {
  alertQuantity: number;
  buyDate: string;
  expiredDate: string;
  expiredPeriod: number;
  id: number;
  name: string;
  primePrice: null;
  relievedQuantity: number;
  remainQuantity: number;
  unitPrice: number;
  unitQuantity: number;
  units: string;
  url: string;
  username: string;
}
export const CookingDB = () => {
  const [, setDB] = useRecoilState(DBAtom);
  // const [edit, setEdit] = useRecoilState(EditMode);
  const instance = useAxiosInstance();
  const [, setOption] = useRecoilState(Options);
  const [add, setAdd] = useState(false);
  const [mod, setMod] = useState(false);
  // const token = useRecoilValue(AuthorizedToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await instance.get("food/recipes");

        setDB(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    const inventoryData = async () => {
      try {
        const response: any = await instance.get("/inventory/");
        const nameOfData: Map<string, number> = new Map();
        response.data.map((data: InventoryData) => {
          const { name, id } = data;
          return nameOfData.set(name, id);
        });
        setOption(nameOfData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    inventoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [add]);

  return (
    <div className="flex justify-center">
      <div className="w-[80rem] min-h-[40rem] mt-4">
        {/* <div className="flex justify-end p-4">
          <input
            type="text"
            className="border-[1px] border-black rounded-xl px-2 py-1"
            placeholder="요리명으로 검색"
          ></input>
          <button className="w-14 h-9 bg-sky-500 hover:bg-sky-600 text-sm text-white text-center rounded-md ml-4">
            검색
          </button>
        </div> */}
        <div className="flex justify-end p-4"></div>
        <DBBox setAdd={setAdd} />
        {add && <AddRecipe add={add} setAdd={setAdd} />}
        {mod && <ModifyRecipe mod={mod} setMod={setMod} />}
      </div>
    </div>
  );
};
