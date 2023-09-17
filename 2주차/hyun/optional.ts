//@ exactOptionalPropertyTypes 옵션을 켰을 때.

type Person = { name?: string };
const person: Person = {};
console.log(person.name); // undefined
const person2: Person = { name: undefined };
