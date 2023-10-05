// 📝 infer는 연습과 시도로 숙달해두는 게 좋다.
type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

type T0 = Unpacked<string>; // string
type T1 = Unpacked<string[]>; // string
type T2 = Unpacked<(num: number) => string>; // string
type T3 = Unpacked<Promise<string>>; // string
type T4 = Unpacked<Promise<string>[]>; // Promise<string>
type T5 = Unpacked<Unpacked<Promise<string>[]>>; // string

type User = {
  id: number;
  name: string;
};

// 일반적으로 infer U 하나로 여러 타입을 처리할 시: union으로 변환
type PropertyType<T> = T extends { id: infer U; name: infer U } ? U : T;
type U1 = PropertyType<User>; // string | number

// 함수 parameters에서 infer U 하나로 여러 타입을 처리할 시: intersection으로 변환
type Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void }
  ? U
  : never;
type U3 = Bar<{ a: (x: string) => void; b: (x: number) => void }>; // string & number => never

// 여러 타입을 여러 infer U, R로 처리하면 각자 변환
type PropertyType2<T> = T extends { id: infer U; name: infer R } ? [U, R] : T;
type U2 = PropertyType2<User>; // [number, string]

type UnionToIntersection<U> = (
  U extends any ? (arg: U) => void : never
) extends (arg: infer R) => void
  ? R
  : never;

type ML = UnionToIntersection<number | { brand: "ml" }>; // number & { brand: "ml" }
