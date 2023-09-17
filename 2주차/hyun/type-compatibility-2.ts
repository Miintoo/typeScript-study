//📒 잉여 속성을 명시적으로 허용하고 싶을 경우. 그러나 위험하단 것도 염두하자.
interface Food {
  protein: number;
  carbohydrates: number;
  fat: number;
  [K: string]: any;
}

function calculateCalorie(food: Food) {
  const { carbohydrates, protein, fat } = food;
  return carbohydrates * 4 + protein * 4 + fat * 9;
}

calculateCalorie({
  carbohydrates: 20,
  fat: 22,
  protein: 11,
  burgerBrand: "Mom's Touch",
});
