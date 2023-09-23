const parseNames = <T>(names: T) => {
  return names;
};

const literalNames = {
  paul: "McCartney",
  john: "Lennon",
} as const;

const names1 = parseNames(literalNames);
const names2 = parseNames({
  paul: "McCartney",
  john: "Lennon",
} as const);

//👍 전달되는 인자(arguments)가 const로 고정됐으므로 변형 불가능.
names1.john = "박";
names2.john = "박";

const names3 = parseNames({
  paul: "McCartney",
  john: "Lennon",
});

//👎 인자가 const로 고정된 게 아니어서 변경 가능.
//❓ 매번 모든 인자를 const로 고정하고 전달해야만 하는 건 불편하지 않나?
names3.john = "박";

/**
 * 📘 TS 5.0문서: "개발자가 매번 as const로 고정하는 건 실수할 확률이 높다."
 * ❗ const parameters: 전달 되는 arguments가 const가 아니어도, 함수측에서 const로 처리.
 * */

const parseNamesWithConst = <const T>(names: T) => {
  return names;
};

const names4 = parseNamesWithConst({
  paul: "McCartney",
  john: "Lennon",
});

names4.john = "박";
