//@ const는 타입 추론을 구체적으로, let은 느슨하게 한다.
let k1 = null; // any
const k2 = null; // null

let v1 = undefined; // any
const v2 = undefined; // undefined

let hello1 = "hello"; // string
const hello2 = "hello"; // "hello"

let sym1 = Symbol("현"); // symbol
const sym2 = Symbol("현"); // typeof sym2

//@ 함수, 객체, 배열, 클래스 등의 '객체'는 let처럼 느슨하게 추론한다.
const user1 = {
  name: "John", // name: string
  age: 30, // age: number
};
