type Animal = {
  name: string;
  age: number;
};

//❓ 기존 타입의 일부만 쓰고 싶다면 참조해오는 수도 있다.
type N1 = Animal["name"];

const person = {
  name: "John",
  age: 30,
};
/**
 * ❓ keyof의 대상은 보통 type | interface.
 * 그 외의 경우에 쓰고 싶다면 아래와 같이 하는 수도 있다.
 * */
type keys = keyof typeof person;
type values = (typeof person)[keys];

//❓ index signature는 아래와 같이 일반형으로 쓰거나,
type Brewery = {
  [K: string]: string;
};

type Union = "name" | "age";

//❓ key in "유니온 타입"만 쓸 수 있다.
type User = {
  [key in Union]: string;
};

//❓ keyof 타입|인터페이스는 해당 타입들을 유니온으로 반환한다.
type CopyAnimal = {
  [key in keyof Animal]: string;
};

interface User2 {
  readonly name?: string;
  age?: number;
  married?: boolean;
}
//❓ "-"를 붙이면 해당 옵션을 제거한다. 아래는 readonly와 optional을 제거한다.
type User1 = {
  -readonly [key in keyof User2]-?: User2[key];
};
