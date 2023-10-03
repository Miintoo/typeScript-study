type Food = { carbohydrates: number; protein: number; fat: number };
type Burger = Food & { burgerBrand: string };

function calculateCalorie({ carbohydrates, protein, fat }: Food) {
  return carbohydrates * 4 + protein * 4 + fat * 9;
}

const thighBurger: Burger = {
  carbohydrates: 60,
  protein: 28,
  fat: 27,
  burgerBrand: "Mom's Touch",
};

const filletBurger = {
  carbohydrates: 13,
  protein: 39,
  fat: 6.4,
  burgerBrand: "Mom's Touch",
};

//❓ 탄단지 속성이 있는데 버거 브랜드가 추가됐다고 칼로리 계산을 막는 게 합리적일까?
//📒 TypeScript는 덕 타이핑 지원: 추론된 타입이든, 확정된 타입이든, 구조만 만족하면 통과
calculateCalorie(thighBurger);
calculateCalorie(filletBurger);

//❗ 객체 리터럴 만은 모든 구조가 정확한지 체크한다.
calculateCalorie({
  carbohydrates: 20,
  fat: 22,
  //❓ protein이 없어서 에러.
});

calculateCalorie({
  carbohydrates: 20,
  fat: 22,
  protein: 11,
  burgerBrand: "Mom's Touch", //❓ 잉여 속성이 붙어서 에러.
});

/**
 * 📒 객체 리터럴 검사도 잉여 속성을 허용하면 손해가 크다.
 * 😡 부작용 1
 * 다른 개발자는 calculateCalorie 함수가 burgerBrand가 필수 속성이라고 오해할 여지
 * */
const calorie1 = calculateCalorie({
  protein: 29,
  carbohydrates: 48,
  fat: 13,
  burgerBrand: "버거킹",
});

/**
 * 🤬 부작용 2
 * birgerBrand는 오타인데 잉여 속성이라고 제대로 검사 안 함
 * */
const calorie2 = calculateCalorie({
  protein: 29,
  carbohydrates: 48,
  fat: 13,
  birgerBrand: "버거킹",
});
