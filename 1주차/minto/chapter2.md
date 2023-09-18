## 2.1 변수, 매개변수, 반환값에 타입을 붙이면 안된다.

## 2.2 타입 추론을 적극 활용하자

타입스크립트의 경우 타입을 명시하지 않아도 자동으로 타입을 추론해준다. 

타입 추론과 직접 타입중에는 일단 타입 추론이 제대로 된다면 굳이 직접 타입을 작성하지 말고 타입 추론이 잘못 되었을 경우에만 타입을 작성하는게 좋다고 한다. 

```js
  const str1: {} = 'hello';
```

{} 타입은 null과 undefined를 제외한 모든 타입의 사용이 가능하다.

let과 const로 선언하는경우 타입추론을 다르게 한다. 

```js
const str1 = 'hello'; //hello

let str2 = 'hello' // string 
```

let의 경우 타입을 넓게 추론하기 때문에 string으로 추론을한다.

## 2.3 값 자체가 타입인 리터럴 타입이 있다.

```js
const obj = { name: 'zero' }; // const obj = { name: string }
const arr = [1, 'zero']; // const arr: (string | number)[]

const obj = { name: 'zero' } as const // const obj: { name: 'zero' }
const arr = [1, 'zero'] as const // const arr: readonly [1, 'zero'] 
```

객체로 선언할경우 내부 값이 바뀔 수 있기 때문에 넓게 타입추론을 한다.
이를 막고 싶으면 as const 문법을 통해서 고정된 값으로 만들 수 있다. 

```js
function getColor(code: 'red' | 'green' | 'blue'): string {
    switch (code) {
        case 'red':
            return '#FF0000';
        case 'green':
            return '#00FF00';
        case 'blue':
            return '#0000FF';
        default:
            // TypeScript는 여기에서 코드가 'red', 'green', 'blue' 중 하나임을 인식합니다.
            // 그 외의 값은 컴파일 오류가 발생합니다.
            throw new Error('Invalid color code');
    }
}
```

그럼 리터럴 타입을 왜 사용할까? 
위에 코드를 보면 알 수 있는데 함수의 매개변수를 사용해서 값을 결정할 경우 조금 더 좋은 가독성으로 안전성있게 인자를 전달해줄 수 있기 때문에 사용한다고 보면 될꺼같다.
이를 통해 런타임 환경이 아닌 개발 단계에서 미리 에러를 발견할 수 있다.


## 2.4 배열 말고 튜플도 있다.

튜플은 각 요소 자리에 타입이 고정되어 있는 배열을 튜플이라고 한다.

```js
const tuple: readonly [number, boolean, string] = [1, false, 'str'];
```

그래서 각 요소에 인덱스에 접근해 값을 바꾸려하면 해당하는 타입에 해당하는 값으로만 바꿀 수 있다.
그리고 readonly 옵션을 줘서 배열에 push 명령어로 추가적인 값을 넣는걸 막을 수 있다.

## 2.5 타입으로 쓸 수 있는 것을 구분하자

String, Number, Boolean, Symbol등의 대문자로 시작하는 타입은 사용하지 말자

## 2.6 유니언 타입으로 OR 관계를 표현하자

타입스크립트에서는 parseInt에 인수로 문자열만 넣을 수 있도록 제한했다.

2.3절 예시 코드에서 나온 유니온 코드를 보면 어떤 아이인지 이해하기 쉽다.

## 2.7 타입스크립트에만 있는 타입을 배우자


1. any 타입 
  - any 사용을 지양 any타입이면 타입 검사를 하지 못한다.
  타입 추론시 any로 추론하는 타입은 모두 타입 명시를 해주는게 좋다.
  - 처음 배열 선언시 any[] 타입으로 타입 추론을 하지만 배열에 요소를 추가할수록 추가된 요소의 타입을 검사해 배열에도 타입 추론이 계속적으로 바뀌게 된다.
  - fetch나 parse의 경우 any로 추론하니 명시적으로 타입을 작성해줄 필요가 있다.

  any는 사용을 지양하는게 전체적으로 좋다. 하지만 any를 사용할 수 밖에 없는 상황이 있는데 외부 라이브러리를 사용할 경우 이 라이브러리에 함수가 typeScript로 작성되지 않았을 경우 내 코드와 호환성을 위해서 사용하는게 좋다. 


2. unknown

unknown타입은 모든 타입에 대입할 수 있지만 그 후 추가적인 동작을 하지 못한다. 

3. void

함수에 반환값이 없는 경우 void 타입으로 추론한다.

void의 사용 목적은 두가지인데 첫 번째는 사용자가 함수의 반환값을 사용하지 못하도록 하는데 있다.

```js
const func1 = (): void => 3; // 이런경우 함수의 반환값만 void이므로 3을 반환하는 경우 에러가 발생한다.

const func2: () => void = () => 3; // 이렇게 함수 전체를 타입으로 지정해주는 경우 에러는 발생하지 않는다.

const func3: () => void | undefined = () => 3 // 이렇게 유니온 타입으로 입력을 하면 전체 함수가 타입이여도 에러가 발생한다.
```

<strong>그럼 왜 void를 사용할까? </strong>

반환값을 사용하지 않은 콜백함수에 경우 사용한다.

```js
const a = [];
[1, 2, 3].forEach(item => a.push(item));
```

이런 코드가 있다면 push 명령어에 반환값은 number값이 찍히게 짜여져 있다. 이 경우 forEach내부 콜백은 number 타입이 찍혀야 한다.

```js
[1, 2, 3].forEach(item => item.toString());
```

이런 코드의 경우 반환값은 string으로 찍히게 된다. 이런 여러가지 경우에 반환값을 모두 호환하기에는 번거로우니 void 타입으로 선언해 관리하는거 같다.


두 번째는 반환값의 타입을 지정해주고 싶지 않은 경우 사용한다.

4. {} Object

null과 undefined를 제외한 모든 값을 의미한다.
사용하지 않는게 좋다.

5. never

never 타입에는 어떠한 타입도 대입할 수 없다.

함수 선언식의 경우 반환값이 없으면 void로 타입이 추론되고 함수 표현식은 never로 타입 추론이 된다. (물론 반환값이 없을 경우) 

## 2.8 타입 별칭으로 타입에 이름을 붙이자

```js
type A = string;
const str: A = 'minto';
```

타입은 대문자로 시작하는게 좋다.
타입 별칭은 string 같은 타입 보다는 복잡한 타입에 붙여서 사용한다.

```js
type ValueWithUnit = (value: number, util: string) => string;
const func2: ValueWithUnit = (value, util) => value + util;
```

이런 복잡한 함수나 객체, 배열을 사용할 때 보통 타입 별칭으로 불리해서 작성한다.