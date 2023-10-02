export interface SettlementData {
  id: number;
  dish: string;
  price: number;
  quantity: number;
  count: number;
}
export interface Ingredient {
  id: number;
  ingredientName: string;
  quantity: number;
  units: string;
  foodIdx?: number;
}

export interface FoodDto {
  id: number;
  name: string;
  fixedPrice: number;
  primePrice: number;
  recipes: Ingredient[];
}

export interface Data {
  foodDtoList: FoodDto[];
}

export interface FoodData {
  name: string;
  quantity: number;
}

export interface InventoryDto {
  IngredientList: IngredientDto[];
}

export interface IngredientDto {
  id: number;
  name: string;
  remainQuantity: number;
  buyDate: string;
  expiredDate: string;
  alertQuantity: number;
  primePrice: number;
  units: string;
  relievedQuantity: number;
  url: string;
  username: string;
}
