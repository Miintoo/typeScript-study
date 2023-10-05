//📔 사람 이름을 받아서 인사하는 함수
function greet(person: string): string {
  return `Hello, ${person}!`;
}

//❓ 배열로 받아들이는 경우를 추가하면?
function greet2(person: string | string[]): string | string[] {
  if (typeof person === "string") {
    return `Hello, ${person}!`;
  } else if (Array.isArray(person)) {
    return person.map((name) => `Hello, ${name}!`);
  }
  throw new Error("Unable to greet");
}

//😵‍💫 케이스가 늘어날수록 복잡해진다.
function greet3(
  person: string | string[] | { name: string } | { name: string }[]
): string | string[] | { name: string } | { name: string }[] {
  return [];
}
