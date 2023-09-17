interface Person {
  name: string;
}

//@ 함수의 extends는 T의 구조가 최소한 Person을 만족하는지 본다.
const returnPersonWithId = <T extends Person>(person: T): T => {
  const newPerson = { ...person, id: "id" };
  return newPerson;
};

const person0 = {};
const person1: Person = { name: "현" };
const person2 = { name: "원", career: 6 };
const person3 = returnPersonWithId(person1);
const person4 = returnPersonWithId(person2);
const person5 = returnPersonWithId(person0);
const person6 = returnPersonWithId({ name: "건", career: 2 });
