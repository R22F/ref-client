import {useEffect, useState} from "react";
import {DBBox} from "../../components/databox/DBBox";
import {useRecoilState} from "recoil";
import {DBAtom, isLoginModalOpen, Options,} from "../../recoil/DBAtom";
import {checkTokenValidate, useAxiosInstance} from "../../Axios/api";
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
export const RecipePage = () => {
  const [, setDB] = useRecoilState(DBAtom);
  // const [edit, setEdit] = useRecoilState(EditMode);
  const instance = useAxiosInstance();
  const [, setOption] = useRecoilState(Options);
  const [add, setAdd] = useState(false);
  const [mod, setMod] = useState(false);
  const [, setIsLoginModalOpen] = useRecoilState(isLoginModalOpen)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await instance.get("food/recipes");
        setDB(response.data);
      } catch (err) {
        checkTokenValidate(err, setIsLoginModalOpen)
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
        checkTokenValidate(err, setIsLoginModalOpen)
      }
    };
    Promise.all([fetchData(), inventoryData()]).then()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [add]);

  return (
    <div className='recipe-container'>
      <div className='recipe-info-table'>
        <DBBox setAdd={setAdd} />
        {add && <AddRecipe add={add} setAdd={setAdd} />}
        {mod && <ModifyRecipe mod={mod} setMod={setMod} />}
      </div>
    </div>
  );
};
