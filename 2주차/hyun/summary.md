# 네임스페이스

이름이 겹치면 안 되는 인터페이스, 타입, 클래스, 특정한 값은 네임스페이스로 **유일성**을 보장한다.  
예시는 아래에서 확인하자.

# 인터페이스

> _“인터페이스는 객체(함수, 클래스 등 포함) 타입을 지정한다.”_

### 옵셔널과 undefined

![optional](https://github.com/hamelln/typescript-textbook/assets/39308313/60276aa3-d0ce-4fc5-9585-917b37460052)

아마 보통은 이렇게 생각할 것이다.

✅ $\textcolor{#ffffffc7}{\textsf{할당한다면 string만 허용하자.}}$  
❌ $\textcolor{#ed322199}{\textsf{undefined도 할당 OK}}$

일부러 undefined가 할당되는 것을 방지하려면 `tsconfig.ts`에서 `exactOptionalPropertyTypes: true`로 바꾼다.

# 인터페이스 재선언

인터페이스는 **재선언**이 가능하다. 아래 조건을 만족하면 원래의 인터페이스와 **병합**이 일어난다.

1️⃣ 기존 속성의 타입을 바꾸는 건 불가능  
2️⃣ 기존에 없던 속성과 타입 추가 가능  
3️⃣ **다른 모듈에서 import한 인터페이스는 병합 불가능**

즉, 아래와 같이 인터페이스를 같은 공간에서 작성해야 병합이 된다.

![interface-merging-0](https://github.com/hamelln/typescript-textbook/assets/39308313/9273b7d0-aad5-4c2a-8599-81d206e49feb)

> $\textcolor{#ffffffc7}{\textsf{“굳이?”}}$

굳이 이렇게 병합을 지원하는 건 다른 이유 때문이다.

![interface-merging](https://github.com/hamelln/typescript-textbook/assets/39308313/a820aa90-2720-4732-beab-7aa5822f2c1d)

API 타입을 지정할 때 유용하다.

# 타입 호환성

타이핑은 여러 종류가 있다.

### 1️⃣ 명목적 타이핑(Nominal Typing)

```
type A = { name: string }
type B = { name: string }
let a:A = { name: "현" }
let b:B = { name: "현" }
a = b; //❗ Error: 타입 이름이 다르면 구조가 같아도 거절.
```

### 2️⃣ 구조적 타이핑(Structure Typing)

**타입스크립트가 채택한 방식. 필수 구조만 같으면 동일**하다고 인정.  
구조적 타이핑은 덕 타이핑이라고 부르기도 한다. 간단한 설명을 보고 가자.

Q) **“오리란 무엇인가?”**

1. 딱 봐도 오리 같은 부리를 가졌다.
2. 딱 봐도 오리 같은 눈을 가졌다.

위 두 조건을 갖추면 오리라고 정의하겠다.

![rp0g39w789nqe8uzge8p](https://github.com/hamelln/typescript-textbook/assets/39308313/1b280fe5-0bc6-4c4c-bd15-2b34dd8baeaa)

반박할 여지 없이 완벽한 오리다.(포토샵이라는 의문 안 받음)

코드로도 확인해보자.

![type-compatibility-0](https://github.com/hamelln/typescript-textbook/assets/39308313/19f1a3bb-acf8-436a-bd53-937409660fb0)

객체 지향 프로그래밍 관점으로 보자면 구조적 타이핑은 다형성을 허용한다.  
버거든 피자든, 음식이라는 조건을 갖추면 칼로리 계산을 허용함으로서 유연성을 발휘한다.  
그런데 이 유연성이 항상 적용되는 건 아니다. 특별 케이스가 하나 있다.

### 객체 리터럴: 엄격하게 검사

TypeScript는 객체 리터럴을 $\textcolor{#3498DB}{\textsf{fresh한 객체}}$라고 분류하고 **구조가 완벽하게 일치**하는지 체크한다.  
**이미 변수에 담겨 추론되거나 as의 타입 단언 등, 타입이 결정된 객체는 $\textcolor{#3498DB}{\textsf{freshness}}$를 잃어서 덕 타이핑으로 체크.**  
아래 예제를 통해 알아보자.

![type-compatibility-literal](https://github.com/hamelln/typescript-textbook/assets/39308313/82be080e-a9f7-46b9-ba53-59908a822740)

### 브랜딩 기법

잉여 속성이 들어오는 걸 원천 차단하고 싶다면 **브랜딩 기법**을 활용한다.

![type-compatibility-3](https://github.com/hamelln/typescript-textbook/assets/39308313/3bef8c15-fec4-432a-b933-5c330b4b7bde)

# 타입 상속

![type-extends](https://github.com/hamelln/typescript-textbook/assets/39308313/a681f7b3-4787-47f4-9b3b-675e5f213fa8)

# 제네릭

소프트웨어 개발자의 최대 관심사 중 하나는 "재사용성"이다.  
C#, Java 같은 정적 타입 언어들은 다양한 타입이 들어와도 유연하게 실행할 수 있도록 제네릭을 지원한다.  
타입스크립트의 제네릭도 그로부터 비롯했기 때문에 개념은 비슷하다.  
제네릭에는 기본값을 지정할 수 있다.
이는 JS에서 함수에 기본값을 지정하는 것과 매우 흡사하다.
제네릭은 아무 때나 쓰는 게 아니라 재사용과 추상화가 필요하고, 코드가 조금 복잡한 경우에 쓰는 게 좋다.  
단순한 경우에는 제네릭 없이 타입만 명시한다.

# 참조

- 조현영(2023.08). **타입스크립트 교과서.** 길벗
- [김병묵(2022.10). TypeScript 타입 시스템 뜯어보기: 타입 호환성](https://toss.tech/article/typescript-type-compatibility)
- [나를 찾는 아이(2023.07). [typescript] optional 속성에 undefined를 할당할수 있을까?](https://trend21c.tistory.com/2332)
- [캡틴판교. 제네릭 제약 조건.](https://joshua1988.github.io/ts/guide/generics.html#%EC%A0%9C%EB%84%A4%EB%A6%AD%EC%9D%98-%ED%95%9C-%EC%A4%84-%EC%A0%95%EC%9D%98%EC%99%80-%EC%98%88%EC%8B%9C)
- [Antonello Zanini(2022.08). How to extend the Express Request object in TypeScript](https://blog.logrocket.com/extend-express-request-object-typescript/)
- [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html#structural-type-system)
