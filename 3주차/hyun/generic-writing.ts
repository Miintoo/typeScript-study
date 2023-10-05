// 어떤 타입을 집어넣어야 할지, 어떤 의미인지 이해하는 데에 시간이 필요하다.
type FirstIfString<T> = T extends [infer S extends string, ...unknown[]]
  ? S
  : never;

// 어떤 타입을 집어넣어야 할지, 어떤 의미인지 더 빠르게 이해한다.
type FirstIfString<Array> = Array extends [
  infer Element extends string,
  ...unknown[]
]
  ? Element
  : never;
