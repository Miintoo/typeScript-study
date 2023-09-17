type Animal = {
  name: string;
  age: number;
};

type N1 = Animal["name"];
// type N2 = Animal.name; // 이런 식으로는 불가능.

const person = {
  name: "John",
  age: 30,
};

type keys = keyof typeof person;
type values = (typeof person)[keys];
// 객체의 키는 string, symbol이 있고 배열용으로 number 키도 가능하다.
type K = keyof any;
// Array의 모든 key를 가져옴. 숫자는 index로 쓰일 수 있으므로 모든 숫자 가능.
type K2 = keyof [1, 2, 3];

// index signature는 아래와 같이 일반형으로 쓰거나
type Brewery = {
  [K: string]: string;
};

type Union = "name" | "age";

// key in ~~로만 쓸 수 있다.
type User = {
  [key in Union]: string;
};
