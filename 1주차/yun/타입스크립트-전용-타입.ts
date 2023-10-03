/*
    any 타입
*/

let strType: any = '아무거나';
const anyResult = strType.toFixed();
// const anyResult: any

function anyPlus(x, y){
    return x + y;
    /*
        Parameter 'x' implicitly has an 'any' type
        Parameter 'y' implicitly has an 'any' type
    */
}

const anyList = [];
// any[] 또는 never []

let a: any = '123';

let aPlus = a + 1;
// let aPlus: any
// 숫자를 더할 때 변수가 숫자값이면 number 타입이 되지만
// 변수가 문자열이면 string 타입이 되므로
// TypeScript는 any 타입으로 추론한다.

let aSubtract = a - 1;


