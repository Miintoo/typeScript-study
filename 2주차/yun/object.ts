/*
    옵셔널 '?' 과 readonly
*/

interface User{
    hello: string;
    world?: number;
    readonly wow: boolean;
    readonly multiple?: symbol;
}

const example: User = {
    hello: 'hi',
    world: undefined,
    wow: false,
}
example.no;
// Property 'no' does not exist on type 'User'

example.wow = true;
// Cannot assign to 'wow' because it is a read-only property

const test: User = {
    hello: 'hello',
    why: '나만 에러야'
    // Type '{hello: string; why: string; }' is not assignable to type 'User'.
    // Object literal may only specify known properties, 
    // and 'why' does not exist in type 'User'.
}

interface User2{
    hello: string;
}

const obj2 = {
    hello: 'hi',
    why: '나는 에러가 아니야',
}
const example2: User2 = obj2;
