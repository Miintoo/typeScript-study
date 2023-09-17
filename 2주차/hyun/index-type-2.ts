interface User {
  readonly name?: string;
  age?: number;
  married?: boolean;
}
// "-"를 붙이면 해당 옵션을 제거한다는 뜻. 아래는 readonly와 optional을 제거한다.
type User1 = {
  -readonly [key in keyof User]-?: User[key];
};

const user: User1 = {
  name: "John",
  age: 6,
  married: false,
};
