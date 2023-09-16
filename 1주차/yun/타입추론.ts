// 타입 추론

const nev = null;
// null
let sym = Symbol('sym');
// symbol
const data = Symbol('sym');
// typeof data
let obj = {
    sym: 'data',
}
// object

console.log(typeof sym);
// symbol
const test = Symbol();

let obj1 = {
    [test]: 'value'
}
// object;

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

console.log(+big2);
// TypeError: Cannot convert a BigInt value to a number

alert(1n + 2);
// Uncaught TypeError: Cannot mix BigInt and other types

function add(x, y){
    return x + y
}
