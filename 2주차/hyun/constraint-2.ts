//💡 타입이 구체적이고 인자를 객체 리터럴로 전달하면 잉여 속성을 발견 시 에러남.
const returnWithOnlyPersonParams = (person: Person) => person;
returnWithOnlyPersonParams({ name: "건", career: 2 });

interface Person {
  name: string;
}

/**
 * 함수 제네릭에서 extends를 쓰면 덕 타이핑을 한다.
 * T ⊆ Person
 */
const returnPersonWithId = <T extends Person>(person: T): T => {
  const newPerson = { ...person, id: "id" };
  return newPerson;
};

returnPersonWithId({}); // 필수 속성 name이 없으므로 에러.
returnPersonWithId({ name: "현" });
returnPersonWithId({ name: "건", career: 2 }); // 잉여 속성이 있지만 통과.
