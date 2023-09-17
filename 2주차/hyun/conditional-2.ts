//# 1. 제네릭을 통한 타입 체크는 각각 나눠서 한다.
//# 2. 타입 체크를 나눠서 하지 않고 한 번에 하려면 []로 감싼다.

type StringOrNumber = string | number;
type Never = StringOrNumber extends string ? string[] : never;

//? string ⊆ string | number ⊈ string => string[]
type Result<K> = K extends string ? K[] : never;
const result: Result<string | number> = ["hello"];

//? string ⊆ StringOrNumber | number ⊆ StringOrNumber | symbol ⊈ StringOrNumber
//? => string[] | number[]
type ToArrayNonDist<T> = T extends StringOrNumber ? T[] : never;
type StrArrOrNumArr = ToArrayNonDist<string | number | symbol>;

//? [string | number] ⊆ [string | number] => (string | number)[]
type ToArrayNonDist2<T> = [T] extends [string | number] ? T[] : never;
type StrArrOrNumArr2 = ToArrayNonDist2<string | number>;

//? [string | number | symbol] ⊈ [string | number] => never
type ToArrayNonDist3<T> = [T] extends [string | number] ? T[] : never;
type StrArrOrNumArr3 = ToArrayNonDist2<string | number | symbol>;
