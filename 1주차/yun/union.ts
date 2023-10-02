/*
    유니언 타입(union type)
    : 유니언 타입으로 배열 타입을 설정할 때는 소괄호의 범위를 잘 맞춰야 한다.
    배열 요소에 두 가지 타입의 요소들이 들어갈 경우, '(타입1 | 타입2)[]' 양식으로 맞춘다.
    만약 '타입1 | 타입2[]' 양식으로 맞출 경우  해당 변수의 타입은 특정 타입과 다른 배열 타입이
    같이 있는 유니언 타입으로 인식한다.
*/

let strOrNum: string | number = 'hello';
strOrNum = 123;

// 타입 좁히기
if(typeof strOrNum === 'number'){
    strOrNum.toFixed();
}

const unionList = [1, 'yes', 2];
// const unionList: (string | number)[]

function returnUnion(value: string | number): number{
    return parseInt(value);
    /*
        Argument of type 'string | number' is not assignable to parameter of type 'string'
        JavaScript에서는 오류가 발생하지 않지만 TypeScript에서는 parseInt() 함수의 인수를 문자열만
        넣을 수 있게 제한했다.
    */    
}

