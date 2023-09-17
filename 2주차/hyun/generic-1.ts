//# 제네릭: 타입스크립트의 꽃.
//@ ES6의 shorthand property names
type Person = { name: string };
const name = "현";
const person = { name }; // name: name 대신 name으로 생략 가능.

class User implements Person {
  name = "aaa";
}

const numbers = [1, 3, 7, 2, 8];
const strings = ["apple", "banana", "cherry"];

// 숫자 배열의 최댓값 찾기
function findMaxNumber(numbers: number[]) {
  return numbers.reduce((a, b) => Math.max(a, b));
}

// 문자열 배열의 최댓값 길이 찾기
function findMaxLength(strings: string[]) {
  return strings.reduce((a, b) => Math.max(a, b.length), 0);
}

// 제네릭 함수
function findMax<T>(items: T[], callback: (items: T[]) => number) {
  return callback(items);
}

const maxNumber = findMax(numbers, findMaxNumber);
const maxLength = findMax(strings, findMaxLength);
