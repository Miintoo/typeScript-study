const textLiteral: 'hello' = 'hello';
// 문자열 리터럴 

const numLiteral: 456 = 456;
// 숫자 리터럴

const objLiteral: {name: string} = {name: 'Yeonjun'};
// 객체 리터럴

const funcLiteral: (amount: number, unit: string) => string
= (amount, unit) => amount + unit;
// 함수 리터럴

const arrLiteral: [1, 3, 'five'] = [1, 3, 'five'];
// 배열 리터럴

const strWrapper = new String('hello');
console.log(typeof strWrapper);
// object 타입

function add(x: Number, y: Number) {return x + y;}
// Operator '+' cannot be applied to types 'Number' and 'Number'.
// Number 타입에는 '+' 연산자를 적용할 수 없다.

const str: string = strWrapper;
// Type 'String' is not assignable to type 'string'.
// 'string' is a primitive. but 'String' is a wrapper object. Prefer using 'string' when possible
// String 타입에는 string 타입 값을 대입할 수 없다.

let tupleList7: [number, boolean, ...string[]] = [1, true, 'hi', 'hello'];
const typeValue: typeof tupleList7 = [1, true, 'hi', 'hello'];
// 변수 이름에 typeof를 붙여 타입 선언할 때 사용할 수 있다.

function subtract(x: number, y: number){return x - y};
const result1: subtract(1, 2) = subtract(1, 2);
const result2: typeof subtract(1, 2) = subtract(1, 2);
// 'subtract'는 값으로 간주됩니다. 하지만 여기서는 타입으로 사용되고 있습니다.
// 'typeof subtract'를 추가하는 건가요? 할당식의 좌측에는 변수 또는 속성 접근이 와야 됩니다.

class Person{
    name: string;
    constructor(name: string){
        this.name = name;
    }
}