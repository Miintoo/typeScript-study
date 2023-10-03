type Person = { name?: string };
const person: Person = {};

console.log(person.name); // undefined

//❓ undefined의 할당을 허용해도 괜찮을까?
const person2: Person = { name: undefined };
