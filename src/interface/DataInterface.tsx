export interface SettlementData {
  id: number;
  dish: string;
  price: number;
  quantity: number;
  count: number;
}
export interface Ingredient {
  name: string;
  quantity: number;
  units: string;
}

export interface FoodDto {
  id: number;
  name: string;
  fixedPrice: number;
  primePrice: number;
  ingredients: Ingredient[];
}

export interface Data {
  foodDtoList: FoodDto[];
}
