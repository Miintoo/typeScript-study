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

## 2.4 배열 말고 튜플도 있다.

일단 튜플은 각 요소 자리에 타입이 고정되어 있는 배열을 튜플이라고 한다.

```js
const tuple: readonly [number, boolean, string] = [1, false, 'str'];
```

그래서 각 요소에 인덱스에 접근해 값을 바꾸려하면 해당하는 타입에 해당하는 값으로만 바꿀 수 있다.
그리고 readonly 옵션을 줘서 배열에 push 명령어로 추가적인 값을 넣는걸 막을 수 있다.