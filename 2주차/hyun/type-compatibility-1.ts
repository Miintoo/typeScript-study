interface Food {
  protein: number;
  carbohydrates: number;
  fat: number;
}

//📝 탄, 단, 지 속성을 가진 음식을 받아서 칼로리 계산.
function calculateCalorie(food: Food) {
  const { carbohydrates, protein, fat } = food;
  return carbohydrates * 4 + protein * 4 + fat * 9;
}

type Burger = Food & {
  burgerBrand: string;
};

//📒 명시적 서브타이핑: 명시한 A-Z까지 정확히 일치하는가?
const thighBurger: Burger = {
  carbohydrates: 60,
  protein: 28,
  fat: 27,
  burgerBrand: "Mom's Touch",
};

/**
 * 📒 구조적 서브타이핑(덕 타이핑): 필요최저한을 충족하는가?
 * 📝 덕 타이핑: "어떤 새가 오리처럼 걷고, 오리처럼 울면, 나머진 어떻든 오리라고 부르겠다."
 * */
const filletBurger = {
  carbohydrates: 13,
  protein: 39,
  fat: 6.4,
  burgerBrand: "Mom's Touch",
};

//❓ 브랜드 속성 하나 때문에 버거의 칼로리 계산을 막는 건 합리적일까?
calculateCalorie(thighBurger);

//📒 TypeScript는 덕 타이핑을 지원하므로 칼로리 계산 허용.
calculateCalorie(filletBurger);

//📒 그러나 객체 리터럴 검사 만큼은 명시적 서브타이핑. 모든 게 정확한지 체크.
calculateCalorie({
  carbohydrates: 20,
  fat: 22,
  //❓ protein 속성이 누락됨.
});

calculateCalorie({
  carbohydrates: 20,
  fat: 22,
  protein: 11,
  burgerBrand: "Mom's Touch", //❓ 요구 사항에 없는 잉여 속성이 붙음.
});

/**
 * 📒 객체 리터럴마저 잉여 속성을 허용한 채 검사하면 손해가 크다.
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
