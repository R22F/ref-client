import { atom } from "recoil";
import {
  FoodDto,
  IngredientDto,
  SettlementData,
} from "../interface/DataInterface";

export const DBAtom = atom<FoodDto[]>({
  key: "DBAtomArr",
  default: [],
});

export const Ingredients = atom({
  key: "Ingredients",
  default: [],
});

export const EditMode = atom({
  key: "edit",
  default: false,
});

export const totalPriceSet = atom<number>({
  key: "totalPriceSet",
  default: 0,
});

export const foodData = atom<SettlementData[]>({
  key: "foodData",
  default: [],
});

export const settlementData = atom<SettlementData[]>({
  key: "settlementData",
  default: [],
});

export const InventoryDto = atom<IngredientDto[]>({
  key: "IvnAtomArr",
  default: [],
});
//로그인 상태관리 atom
export const Login = atom({
  key: "Login",
  default: false,
});

export const AuthorizedToken = atom({
  key: "token",
  default: "",
});

export const settlementDate = atom({
  key: "settleDate",
  default: "",
});
