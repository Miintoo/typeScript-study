function test<T>(a: T) {
  type R<T> = T extends string ? T : T;
  const b: R<T> = a;
}

//? string | never로 제한.
function test2<T extends [T] extends [string] ? string : never>(a: T) {
  //? string의 부분집합이면 T를 적용. 다른 타입은 never로 적용해서 에러.
  type R<T> = [T] extends [string] ? T : T;
  const b: R<T> = a;
  return b;
}

test2("hello");
test2(42);

const inputArray: string[] = ["one", "two", "three"];
const resultArray: string[] = inputArray.map((item) => test2(item));

function test3(str: string) {
  return str;
}
