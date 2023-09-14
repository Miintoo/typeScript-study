# 1. 타입 명시란?

![image](https://user-images.githubusercontent.com/39308313/267523843-cae7aa92-2300-41c9-a737-64173f2f264f.png)

# 2. 타입은 언제 쓸까?

모든 타입을 일일이 적는 건 이상적인 듯하지만 의외로 번거롭다. 그래서 타입스크립트는 자동으로 타입을 추론하는 기능을 지원한다.  
이 추론이 어떻게 이뤄지는지 알아보고, 판단해보자.  
※ 타입 추론은 코드 실행 전에 하는 것이라 VSCode 같은 IDE로만 볼 수 있다.

### const는 구체적으로, let, 객체는 느슨하게 추론한다

let은 재할당을 전제하기 때문에 추론을 구체적으로 할 수 없다.  
![](https://user-images.githubusercontent.com/39308313/267523918-2b59014c-6ab5-45c8-a7c8-3a7a7a344d30.png)

const로 선언한 "hello"는 string이 아니라 "hello"라는 구체적인 리터럴 타입으로 지정된다.  
const의 원시 타입 추론은 대체로 정확하다. 그러나 JS는 대부분이 객체다.  
객체의 속성들도 const처럼 리터럴 타입으로 지정하려면 `as const`를 쓴다.

![](https://user-images.githubusercontent.com/39308313/267523923-028d091a-7f39-477c-bd3e-693d94714680.png)

**∴) 타입 명시는 일단 "타입 추론이 부정확할 때" 해보자. 그러다가 필요에 따라 바꾸면 된다.**

# 3. 배열과 튜플

튜플은 길이를 고정한 배열이다.  
즉, 튜플 타입이라고 하면 각 index마다 타입을 지정한 타입을 말한다.

![](https://user-images.githubusercontent.com/39308313/267523936-6bf10599-022f-434c-8e87-40f778d49cb7.png)

# 4. 유니온 타입

유니온 타입은 타입을 몇 가지로만 특정할 때 쓴다.  
유니온과 제네릭은 타입스크립트의 꽃이란 찬사를 들을 만큼 강력한 기능이다.  
예를 들어 타입을 몇 가지로 지정하는 방법은 enum도 있지만, enum은 tree-shaking에 영향을 받지 않는다.  
따라서 ‘enum이어야만 할 이유’가 없다면 대부분은 유니온 타입으로 해결할 수 있다.

![](https://user-images.githubusercontent.com/39308313/267523940-911febfc-4149-4c14-b573-162e8442e4ef.png)

# 5. 그 외 타입

위의 예제 코드처럼, JavaScript에서도 typeof로 "string" 등의 간단한 타입 검사가 가능하다.  
하지만 TypeScript에는 JS에 없는 타입들이 많다.

### any

만악의 근원. 쓰지 말아야 할 1순위 타입.
any를 쓰면 TypeScript를 쓰는 의미가 없어지는 수준이라 봐도 좋다.

![](https://user-images.githubusercontent.com/39308313/267523912-a8acc044-bc04-4c6c-b4b2-c6b2d846e3ef.png)

### unknown

any: "뭔지 몰라도 일단 다 OK."  
unknown: "일단 담아오긴 했는데 이걸 쓰려면 무슨 타입인지 네가 밝혀줘야 해."

![](https://user-images.githubusercontent.com/39308313/267523865-5c8f4365-f293-4170-a66f-daa6b4cd7a2e.png)

- any는 무슨 타입이든 할당되고, 무슨 타입인지 몰라도 일단 사용할 수 있다.
- unknown은 무슨 타입이든 할당되지만, 어떤 타입인지 밝혀내기 전까지는 사용할 수 없다.

![](https://user-images.githubusercontent.com/39308313/267523947-0dcff004-2de0-44ed-9002-53a160f82bd3.png)

### void

![](https://user-images.githubusercontent.com/39308313/267523906-e974924a-064c-4a18-b6b5-6a1ed9cea65c.png)

### never

![](https://user-images.githubusercontent.com/39308313/267523928-0f5ab06c-d4ac-40aa-9371-c6ddde56045a.png)

### {}

nullish가 아닌 모든 타입을 가리킨다.  
그러나 어떤 값을 할당해도 속성을 조회하거나 연산자를 쓸 수는 없다.  
왜냐하면 이 타입은 표현 그대로 '빈 객체'를 가리키는 타입이라 그렇다.  
직접 사용할 일은 없겠지만 개발하다보면 {} 타입이 추론되는 경우도 있을 테니 알아만 두자.

# 6. 타입으로 쓸 일 없는 것

String, Number, Object, Boolean 등은 리터럴 타입이 아니라 객체를 가리킨다.  
그래서 일반적으론 쓸 일이 없다.

# 7. 타입 버전

```
// BigInt literals are not available when targeting lower than ES2020.
const bigNum:bigint = 2000000000000000000n;
```

자동으로 에러 메시지를 띄우므로 tsconfig.json에서 아래와 같이 target을 바꾼다.

```
"compilerOptions" {
  "target": "ES2020",
}
```

# e.t.c. JS -> TS로 바꿀 때

잘 실행되던 코드가 타입을 입력했더니 에러가 나는 경우는 흔하다.  
임시방편으로 에러 코드 위에 // @ts-expect-error 주석을 달면 된다.  
최종적으론 주석 없이 마이그레이션을 마치는 걸 목표로 하자.

# e.t.c. Symbol

Symbol은 객체의 unique한 key로 쓰는 타입이다.

Symbol(): 즉시 새 심볼을 만드는 지역적인 메소드  
Symbol.for(): 심볼 레지스트리에 등록된 심볼이 있으면 반환하고, 없으면 만들어서 준다. 전역적으로 쓰기 좋다

본래 객체의 비공개 속성으로 쓰기 위해 개발이 시작됐으나 현재 그런 이유로 쓸 일은 없다.  
객체를 JSON으로 파싱할 땐 string 타입의 key만 처리하기 때문에 심볼 속성은 제외되는 특성이 있다.  
그래서 리액트 내부적으로 엘리먼트 체크를 하거나, 라이브러리 개발 시 중첩을 피하기 위한 용도 등으로 쓰인다.  
일반적으로는 쓸 일이 잘 없다.

```
const author = Symbol("저자의 이름");

interface Person {
  [author]: string;
  author: string;
}

class Person implements Person {
  [author]: string;
  author: string;
  // 매개변수 이름이 심볼 이름과 겹치면 Error.
  constructor(symbolAuthor: string, realAuthor: string) {
    this[author] = symbolAuthor;
    this.author = realAuthor;
  }

  print() {
    console.log(`저자의 심볼: ${this[author]}`);
    console.log(`저자의 이름: ${this.author}`);
  }
}

const zeroCho = new Person("제로초", "조현영");
zeroCho.print();
```

# 참조

- 조현영(2023.08). **타입스크립트 교과서.** 길벗
- [Jesse Hallett(2023.05). When to use never and unknown in TypeScript](https://blog.logrocket.com/when-to-use-never-unknown-typescript/)
- [Marius Schulz(2019.05). The unknown Type in TypeScript](https://mariusschulz.com/blog/the-unknown-type-in-typescript)
- [박서진(2021.05). Template Literal Types로 타입 안전하게 코딩하기.](https://toss.tech/article/template-literal-types)
- [멍개(2022.07). [typescript] 트리쉐이킹 - enum을 써야하는가?](https://blog.naver.com/pjt3591oo/222817775732)
- [TypeScript 공식](https://www.typescriptlang.org/)
