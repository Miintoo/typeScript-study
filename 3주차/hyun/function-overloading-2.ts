// 🔖 오버로딩: 케이스마다 함수 명세와 구현을 분리한다. (마치 인터페이스와 클래스처럼).
// 📝 핵심 1. 명세는 구현을 하지 않는다.
// 📝 핵심 2. 핵심 로직은 동일한데 params와 return의 타입만 다른 정도라면 사용한다.
// 📝 핵심 3. 오버로딩을 쓰기 전에 유니온 타입 등 간단한 방법으로 해결되는지 먼저 체크.
function greet(person: string): string;
function greet(persons: string[]): string[];

// 🔖 구현 함수.
// 📝 핵심: params는 명세에 있는 모든 케이스를 포함하는 넓은 범위로 받는다.
function greet(person: unknown): unknown {
  if (typeof person === "string") {
    return `Hello, ${person}!`;
  } else if (Array.isArray(person)) {
    return person.map((name) => `Hello, ${name}!`);
  }
  throw new Error("Unable to greet");
}
