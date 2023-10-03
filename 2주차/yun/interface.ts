interface Person {
    name: string,
    age: number;
    married: boolean
}

const person2: Person = {
    name: 'zero',
    age: 28,
    married: false,
}

const person3: Person = {
    name: 'nero',
    age: 32,
    married: true,
}

// 인터페이스 한 줄 작성
interface User { name: 'string', gender: 'string', occupation: 'string'}

// 인터페이스 프로퍼티 key에 배열과 함수 넣기
interface Func {
    (x: number, y: number): number,    
}
const add4: Func = (x, y) => x + y;
// 함수 프로퍼티


interface Arr {length: number, [key: number]: string};
// 배열 프로퍼티 => 배일 인덱스를 프로퍼티 key로 넣음
// [key: length] => 이 인터페이스를 넣은 객체의 length를 제외한 프로퍼티 key가 모두 number
// 라는 의미다.

const obj = {
    '[object Object]': 'wow',
}
console.log(({}).toString());
// [object Object]
console.log(obj[{}]);
// wow

/*
    {} 또는 Object 타입은 null과 undefined 타입을 제외한 모든 타입을 의미한다.
    일반적으로 프로퍼티가 하나도 없는 빈 객체로 타입을 선언할 일이 없기 때문이다. 
*/
interface NoProps {}
const obj2: NoProps = {
    why: '에러 안남',
};

const what: NoProps = '이게 되네?';
const omg: NoProps = null;
// 'null' 형식은 'NoProps' 형식에 할당할 수 없다.
const omb2: NoProps = undefined;

/*
    인터페이스는 인터페이스끼리 합칠 수 있다.
    선언 병합(declaration merging)
*/

interface Merge {
    one: string;
}
interface Merge {
    one: string,
    two: number;
}
const example: Merge = {
    one: '1',
    two: 2
}