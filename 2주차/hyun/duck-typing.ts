type Person = { name: string };
type Animal = { name: string };

const person: Person = { name: "현" };
//❓ name만 갖추면 되므로 다른 타입이어도 할당 가능.
const duck: Animal = person;
