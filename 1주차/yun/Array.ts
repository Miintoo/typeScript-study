/*
    배열 타입 선언
*/

const list1: string[] = ['1', '2', '3'];
const list2: Array<number> = [1, 2, 3];
// '<>' => 제네릭

list1.push(4);
// Argument of type 'number' is not assignable to parameter of type 'string'