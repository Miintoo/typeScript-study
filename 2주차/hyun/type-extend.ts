//📒 type은 "&"를, interface는 "extends"를 써서 상속받는다.
type Person = { name: string };
type Worker = Person & { major: string };
type Major = "frontend" | "backend" | "design" | "architect" | "devops";
type Programmer = Worker & { major: Major };

const programmer: Programmer = {
  name: "이태현",
  major: "frontend",
};
