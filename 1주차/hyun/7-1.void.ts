//# void: '명시적인 반환'이 없는 함수의 '반환 타입'
//@ 모든 함수는 return 문이 없을 땐 자동으로 undefined를 반환한다.
const voidFunc = (): void => {};

//! 따라서 undefined를 반환해도 에러는 안 난다. 그러나 이렇게 사용 X.
const badVoidFunc1 = (): void => undefined;

//! 아래와 같이 작성하면 명시적인 return이 가능하지만 이것도 나쁜 짓이니 사용 X.
const badVoidFunc2: () => void = () => 2;
