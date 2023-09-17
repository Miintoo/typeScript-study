//💡 브랜딩 기법: 유니크한 속성을 덧붙여서 잉여 속성을 제한.
type Brand<K, T> = K & { __brand: T };
type Nutrient = { protein: number; carbohydrates: number; fat: number };
type Food = Brand<Nutrient, "Food">;

function calculateCalorie(food: Food) {
  const { carbohydrates, protein, fat } = food;
  return carbohydrates * 4 + protein * 4 + fat * 9;
}

const burger1 = {
  protein: 100,
  carbohydrates: 100,
  fat: 100,
  __brand: "Food",
};

const burger2: Food = {
  protein: 100,
  carbohydrates: 100,
  fat: 100,
  __brand: "Food",
};

calculateCalorie(burger1); //❗ __brand: string으로 추론해서 에러
calculateCalorie(burger2); // 에러 안 남
