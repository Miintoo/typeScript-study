// string
let text: string = 'hello';
const sameText: string = 'Yeonjun';

// number
let score: number = 34.5;
const sameScore: number = 123;

// 매개변수 타입, 반환 타입 지정
const plus = (a:number, b:number): number  => {
    return a + b;
}

// number 타입
const result = plus(1, 2);

// Object 타입  
const str3: {} = 'hello';

// object 타입
const obj2: {name: string} = {name: 'Yeonjun'};

