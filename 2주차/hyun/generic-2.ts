interface User<T, N> {
  id: T;
  name: N;
}

//@ 제네릭에는 기본 타입을 적을 수 있다.
const userFactory = <T, N = unknown>(id: T, name: N): User<T, N> => ({
  id,
  name,
});

const userFactory2 = <T, N = number>(id: T, name: N): User<T, N> => ({
  id,
  name,
});

//@ 기본 타입이 있더라도 타입 추론에 의해 수정됨
const user = userFactory("foo", 123); // string, number
const user2 = userFactory2("foo", "hello"); // string, string
