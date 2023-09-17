/*
-타입 추론
*/

const nev = null;
// null
let sym = Symbol('sym');
// symbol
const data = Symbol();
// typeof data(unique symbol)
let obj = {
    [data]: 'data',
}
// object

console.log(typeof sym);
// symbol
const test = Symbol();

let obj1 = {
    [test]: 'value'
}
// object;

const sym1 = Symbol.for('sym');
const sym2 = Symbol.for('sym');
let sym3 = Symbol.for('sym');
let sym4 = Symbol.for('sym');
console.log(sym1 === sym2);
/*
    unique symbol 타입끼리는 서로 비교할 수 없다.
    This comparison appears to be unintentional because
    the 'types sym1' and 'types sym2' have no overlap
*/

console.log(sym1 === sym3);
// true

console.log(sym3 === sym4);
// true

/*
    unique symbol 타입과 일반 symbol 타입 또는
    일반 symbol 타입끼르는 서로 비교할 수 있다.
*/

let sameObj = {
    name: 'Yeonjun',
    age: 31,
    isMarried: false,
    sayHello: function(){
        console.log(`Hello, My name is ${this.name}`);
    }
    /*
        sayHello(){
            console.log(`Hello, My name is ${this.name}`);
        }
    */
}

console.log(typeof obj1[test]);
// string;

console.log(typeof sameObj);
// object

sameObj.sayHello();
// Hello, My name is Yeonjun

// 리터럴 타입
const str = 'hello';
const num = 13.24;

// 유니언 타입과 리터럴 타입의 결합
type resultConversion = 'as-number' | 'as-text';

// boolean
let bool = true;

// undefined
let n = undefined;

// bigint
let big = 100000n;
console.log(typeof big); // bigint

let sameBig = BigInt('1234');

console.log(sameBig); // 1234n
console.log(typeof sameBig); // bigint

const big2 = 1234n;
// 1234n

let not = null;
let und = undefined;
/*
표기상으로 각각 null과 undefined로 되어있지만
TypeScript는 둘 다 any 타입으로 추론한다.
*/

console.log(+big2);
// TypeError: Cannot convert a BigInt value to a number

alert(1n + 2);
// Uncaught TypeError: Cannot mix BigInt and other types

function add(x, y){
    return x + y
}
/*
타입스크립트에서 함수 매개변수에 타입을 부여하지 않으면
다음과 같은 경고문이 IDE에서 출력된다.

Parameter 'x' implicitly has an 'any' type,
but a better type may be inferred from usage

Parameter 'y' implicitly has an 'any' type,
but a better type may be inferred from usage
*/
