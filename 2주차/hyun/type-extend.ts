//📒 interface는 "extends"를 써서 상속받는다.
type Animal = { name: string };

interface Dog extends Animal {
  bark(): void;
}

const dog: Dog = {
  name: "탱",
  bark() {
    console.log("멍멍");
  },
};

//📒 type은 "&"를 써서 상속받는다.
type Person = { name: string };
type Worker = Person & { major: string };
type Major = "frontend" | "backend" | "design" | "architect" | "devops";
type Programmer = Worker & { major: Major };

const programmer: Programmer = {
  name: "이태현",
  major: "frontend",
};
