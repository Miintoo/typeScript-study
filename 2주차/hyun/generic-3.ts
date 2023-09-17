const isGoodData = <const T>(data: T): boolean => {
  return true;
};

type Person = { id: string; name: string };
type Form = { name: string; value: string };

const person: Person = { id: "123", name: "현" };
const form: Form = { name: "이름 입력창", value: "현" };
const person2 = { id: "123", name: "현", ex: "asd" };

isGoodData<Person>(person2);
