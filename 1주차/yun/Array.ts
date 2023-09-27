/*
    배열 타입 선언
*/

const list1: string[] = ['1', '2', '3'];
const list2: Array<number> = [1, 2, 3];
// '<>' => 제네릭

list1.push(4);
// Argument of type 'number' is not assignable to parameter of type 'string'

const list3 = [1, 2, 3];
// const list3: number[]

const list4 = [1, '3', 5];
// const list4: (string | number)[]

const list5 = [];
// const list5: never[]

// const list6 = [123, 4, 56];
// list6[3].toFixed();
// undefined

const list6: [number, number, number] = [123, 4, 56];
list6[3].toFixed();
// Object is possibly 'defined';


/*
    -고정 소수점 방식(fixed-point notation): 메모리를 정수부와 소수부로 고정으로 나누고 처리하는 방식.
    소수부의 자릿수를 미리 정하고 고정된 자릿수의 소수를 표현하기 때문에 직관적이지만 표현할 수 있는
    범위가 작다.
    (예시: 12(정수부).3345(소수부))

    -부동 소수점 방식(floating-point notation): 표현할 수 있는 값을 범위를 최대한 넓혀 오차를 줄이는 방식.
    부동 소수점은 메모리를 가수부(23bit)와 지수부(8bit)로 나눈다. 고정 소수점 방식에 비해 표현이 다소
    복잡하지만 고정 소수점 방식이 정수부 15bit, 소수부 16bit만 표현할 수 있는 것에 비해 표현할 수 있는
    실수의 범위가 더 넓다.
    (예시: 1.xxx(가수부) * 2의 n제곱(지수부))
    ※ 지수(e) 표기법: 과학적 표기법(scientific notation)이라고 불리운다. 아주 큰 숫자나 작은 숫자를
    간단하게 표기할때 사용되는 표기법
    표기법: -3.14E+16(지수부는 e 또는 E로 시작함/+기호는 생략 가능하다.)
    (예시: 1.234e2 => 1.234 * 10의 2제곱)
    (1.7e+3 => 1700.0)
    (1.7e-3 => 0.0017)
*/

/*
    튜플 배열
*/

const tuple: [number, boolean, string] = [1, true, 'hi'];
tuple[0] = 3;
tuple[2] = 5;
// Type 'number' is not assignable to type 'string'

tuple[3] = 'no'
// Tuple type '[number, boolean, string]' of length '3' has no element at index '3'
// Type '"no"' is not assignable to type 'undefined'

tuple.push('yes');

const tuple2: readonly [number, boolean, string] = [2, false, 'hi'];
tuple2.push('no');
// Property 'push' does not exist on type 'readonly [number, boolean, string]'

const tuple3: [number, number, number] = [123, 4, 56];
tuple3[3].toFixed();
// Object is possibly 'undefined'

/*
    튜플에 전개 연산자 적용하기
    => '...타입[]' 표기를 사용해서 특정 타입이 연달아 나올 수 있다.
    
    타입을 작성하지 않고 값에 전개 연산자를 작성해도 타입 추론을 할 수 있다.
*/

const tupleList: [string, number, ...boolean[]] = ['hi', 1, false, true, false];
const tupleList2: [string, ...number[], boolean] = ['hell0', 1, 2, 3, true];
const tupleList3: [...string[], number, boolean] = ['hi', 'hello', 'yeonjun', 3, false];

const tupleList4 = [true, false, true, 34.5, 'hi'];
const tupleList5 = [46, ...tupleList4];
// const tupleList4: (string | number | boolean)[]

/*
    튜플에 나머지 연산자 적용하기, 구조분해 할당에 나머지 연산자 적용하기
*/

const [a, ...rest1] = ['hello', '1', '2', 3, 4];

const [b, ...rest2]: [string, ...number[]] = ['name', 1, 33, 234, 56.3];
// 명시적 타이핑, 튜플에 나머지 연산자 적용

/*
    옵셔널 수식어가 포함된 타입 선언
*/

let tupleList6: [string, number?, boolean?] = ['yes', 2, false];
tupleList6 = ['hello'];
tupleList6 = ['hello', 2];
tupleList6 = ['hello', false];
// Type 'boolean' is not assignable to type 'number | undefined'



