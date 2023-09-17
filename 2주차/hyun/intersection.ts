type A = string & number; // never
type B = unknown & number; // number
type C = unknown | number; // unknown
type D = never & number; // never
type E = never | number; // number
type F = string & { age: number }; // string & { age: number }
//? 아래와 같은 타입은 브랜딩 기법에 활용됨.
type G = { name: string } & { age: number };
