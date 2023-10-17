import { atom } from 'recoil';
import { FoodDto, IngredientDto } from '../interface/DataInterface';

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
export const InventoryDto = atom<IngredientDto[]>({
  key: 'IvnAtomArr',
  default: [],
});
//로그인 상태관리 atom
export const Login = atom({
  key: 'Login',
  default: false,
});

export const AuthorizedToken = atom({
  key: 'token',
  default: localStorage.getItem('token') || null,
});

export const Options = atom<Map<string, number>>({
  key: 'options',
  default: new Map<string, number>(),
});
