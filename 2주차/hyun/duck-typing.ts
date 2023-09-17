interface Person {
  name: string;
}

interface Animal {
  name: string;
}

const person: Person = { name: "현" };
const duck: Animal = person;
