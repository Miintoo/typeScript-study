// 재귀 타입은 내부에 똑같은 형식의 값이 들어올 경우에 유용.
// 예: n차원 배열, 트리, JSON...
type ValueOrArray<T> = T | ArrayOfValueOrArray<T>;
type ArrayOfValueOrArray<T> = Array<ValueOrArray<T>>;
const arr: ArrayOfValueOrArray<string> = ["a", ["b", ["c"]]];

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
const exampleStatusJSON: Json = {
  available: true,
  username: "Jean-loup",
  room: {
    name: "Highcrest",
  },
};
