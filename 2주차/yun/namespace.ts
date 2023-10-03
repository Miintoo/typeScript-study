/*
    네임스페이스
*/

/*

namespace Example{
    interface Inner {
        test: string,
    }
    type test2 = number;
}

const exp: Example.Inner = {
    test: 'hello',
}
=> Namespace 'Example' has no exported member 'Inner'

const exp2: Example.test2 = 12;
=> Namespace 'Example' has no exported member 'test2'

*/

namespace Example{
    export interface Inner {
        test: string,
    }
    export type test2 = number;
}

const exp: Example.Inner = {
    test: 'hello',
}
const exp2: Example.test2 = 12;

/*
    네임스페이스 중첩
*/

namespace Test{
    export namespace Outer{
        export interface Exp{
            test: string,
        }
        export type test3 = number;
    }
}

const ex1: Test.Outer.Exp = {
    test: 'hello',
}

/*
    네임스페이스 내부에 값 넣기
*/

namespace Num{
    export const a = 345;
}
const a = Num; // { a: 345 }
const b = Num.a; // 345
const c = Num['a']; // 345

namespace Text{
    export type test4 = string;
}
const ex3: Text['test4'] = 'hello';
// Cannot use namespace 'Text' as a type.

/*
    네임스페이스 중복
*/

namespace Information{
    export interface Inner{
        test: string,
    }
    export type test2 = number;
    // Duplicate identifier 'test2'.
}

namespace Information{
    export interface Inner{
        test1: boolean,
    }
    export type test2 = number;
    // Duplicate identifier 'test2'.
}
const ex5: Information.Inner = {
    test: 'hello',
    test1: true
}
