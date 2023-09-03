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
