import { atom } from 'recoil';
import { FoodData, FoodDto } from '../interface/DataInterface';

export const DBAtom = atom<FoodDto[]>({
  key: 'DBAtomArr',
  default: [],
});

export const Ingredients = atom({
  key: 'Ingredients',
  default: [],
});

export const EditMode = atom({
  key: 'edit',
  default: false,
});
export const foodData = atom({
  key: 'foodData',
  default: {
    quantity: 0,
    name: '',
  },
});
