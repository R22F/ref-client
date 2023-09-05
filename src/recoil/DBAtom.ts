import { atom } from 'recoil';
import { FoodDto } from '../interface/DataInterface';

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
