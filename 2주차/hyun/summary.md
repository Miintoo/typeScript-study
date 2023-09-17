$\textcolor{red}{\textsf{}}$

# 인터페이스

> _객체(함수, 클래스 등 포함) 타입 지정._

```
type Person = { name?: string }
const person:Person = {};
person.name // undefined: 옵셔널 속성에 값이 없으면 undefined
person.id // Error: 없는 속성을 조회하려고 하면 에러
```

### exactOptionalPropertyTypes

```
type Person = { name?: string }
// ❓ 이런 코드를 허용해도 괜찮을까?
const person: Person = { name: undefined };
```

✅ 할당한다면 string  
❌ $\textcolor{#ed322199}{\textsf{undefined도 할당 OK}}$

엄격히 체크하려면 `tsconfig.ts`에서 `exactOptionalPropertyTypes: true`로 바꾼다.

# 네임스페이스

이름이 겹치면 안 되는 인터페이스, 타입, 클래스, 특정한 값은 네임스페이스로 **유일성**을 보장한다.  

# 인터페이스 재선언

인터페이스는 **재선언**이 가능하다. 아래 조건을 만족하면 원래의 인터페이스와 **병합**이 일어난다.

1️⃣ 기존 속성의 타입을 바꾸는 건 불가능  
2️⃣ 기존에 없던 속성과 타입 추가 가능   
3️⃣ 다른 모듈에서 import한 인터페이스는 병합 불가능  

인터페이스가 이런 까다로운 조건을 전제하고 병합을 지원하는 이유는 아래 예시로 설명한다.  
![interface-merging](https://github.com/hamelln/typescript-textbook/assets/39308313/a820aa90-2720-4732-beab-7aa5822f2c1d)

# 타입 호환성

타이핑에는 **명목적 서브타이핑과 구조적 서브타이핑**이 있다.  
- 명목적 서브타이핑: A-Z까지 정확하게 검사  
예) TypeScript는 객체 리터럴을 $\textcolor{#3498DB}{\textsf{fresh한 객체}}$라고 간주한다. 이 땐 더도 덜도 말고 완전히 정확한지 체크한다.  
- 구조적 서브타이핑: 요구 사항만 갖췄으면 잉여 속성이 있어도 허용.  
예) **이미 변수에 담겨서 타입이 추론됐거나, as 등으로 타입 단언한 객체는 $\textcolor{#3498DB}{\textsf{fresh}}$를 잃는다.**  
이런 객체는 요구 사항을 갖췄는지만 본다.  

예시 코드로 확인해보자.

![type-compatibility-1](https://github.com/hamelln/typescript-textbook/assets/39308313/0dd4b945-a20a-41bc-848f-7b17751bccf3)

![type-compatibility-2](https://github.com/hamelln/typescript-textbook/assets/39308313/057cd9ed-3fb1-4617-98ed-3d786660a080)

![type-compatibility-3](https://github.com/hamelln/typescript-textbook/assets/39308313/3bef8c15-fec4-432a-b933-5c330b4b7bde)

# 제네릭

소프트웨어 개발자의 최대 관심사 중 하나는 "재사용성"이다.  
C#, Java 같은 정적 타입 언어들은 다양한 타입이 들어와도 유연하게 실행할 수 있도록 제네릭을 지원한다.  
타입스크립트의 제네릭도 그로부터 비롯했기 때문에 개념은 비슷하다.  
제네릭에는 기본값을 지정할 수 있다.
이는 JS에서 함수에 기본값을 지정하는 것과 매우 흡사하다.
제네릭은 아무 때나 쓰는 게 아니라 재사용과 추상화가 필요하고, 코드가 조금 복잡한 경우에 쓰는 게 좋다.  
단순한 경우에는 제네릭 없이 타입만 명시한다.

# 타입 상속

![type-extends](https://github.com/hamelln/typescript-textbook/assets/39308313/a681f7b3-4787-47f4-9b3b-675e5f213fa8)

# 참조

- 조현영(2023.08). **타입스크립트 교과서.** 길벗
- [김병묵(2022.10). TypeScript 타입 시스템 뜯어보기: 타입 호환성](https://toss.tech/article/typescript-type-compatibility)
- [나를 찾는 아이(2023.07). [typescript] optional 속성에 undefined를 할당할수 있을까?](https://trend21c.tistory.com/2332)
- [캡틴판교. 제네릭 제약 조건.](https://joshua1988.github.io/ts/guide/generics.html#%EC%A0%9C%EB%84%A4%EB%A6%AD%EC%9D%98-%ED%95%9C-%EC%A4%84-%EC%A0%95%EC%9D%98%EC%99%80-%EC%98%88%EC%8B%9C)
- [Antonello Zanini(2022.08). How to extend the Express Request object in TypeScript](https://blog.logrocket.com/extend-express-request-object-typescript/)
