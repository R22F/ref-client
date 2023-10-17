export interface SettlementData {
  id: number;
  name: string;
  fixedPrice: number;
  count: number;
  username: string;
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
  name: string; // 재료 이름
  unitQuantity: number; // 사용자 단위 수량
  remainQuantity: number; // 재고 수량
  buyDate: string; // 구매일
  expiredDate: string;
  expiredPeriod: number; // +유효기간
  alertQuantity: number; // 알림 수량
  unitPrice: number; // 사용자 단위 수량별 단위가격
  primePrice: number; // 1unit당 가격
  units: string; // 단위
  relievedQuantity: number; // 구매 수량
  url: string;
}
