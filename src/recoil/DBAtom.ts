import {atom} from "recoil";
import {FoodDto, IngredientDto, SettlementData,} from "../interface/DataInterface";

export const DBAtom = atom<FoodDto[]>({
  key: "DBAtomArr",
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

export const InventoryDto = atom<IngredientDto[]>({
  key: "IvnAtomArr",
  default: [],
});

export const settlementDate = atom({
  key: "settleDate",
  default: "",
});

export const Options = atom<Map<string, number>>({
  key: 'options',
  default: new Map<string, number>(),
});
