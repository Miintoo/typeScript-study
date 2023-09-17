/*
    리터럴 타입
*/

const text1: 'hello' = 'hello';
// 문자열 리터럴 

const num2: 456 = 456;
// 숫자 리터럴

/*
    함수 리터럴 타입
*/

// 객체
const obj3: {name: string} = {name: 'Yeonjun'};

const obj4 = {name: 'Yeonjun'};

const obj5 = {name: 'Yeonjun'} as const;
// 해당 객체에서 name 프로퍼티의 값을 변경할 수 없다.

// Function 타입(화살표 함수)
const func: (amount: number, unit: string) => string
= (amout, unit) => amout + unit;

// 배열
const arr: [1, 3, 'five'] = [1, 3, 'five'];

const arr2 = [1, 3, 'five'];
// (string | number)[] 타입 

const arr3 = [1, 3, 'five'] as const;
// 해당 배열에는 요소를 빼거나 더할 수 없다.