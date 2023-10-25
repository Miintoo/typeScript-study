# 목표

> Branding 기법을 통해 TypeScript가 구조적 타입 시스템을 어떻게 보완하는지 이해합니다.

저희는 [구조적 타입 시스템 문서](https://github.com/hamelln/typescript-dive-notes/blob/main/structural-type-system.md)에서 TypeScript가 구조적 타입 시스템을 사용한다고 배웠습니다. JS와 호환성을 이루기도 하고 객체지향 프로그래밍 관점에서 보자면 "다형성"을 허용함으로서 유연해지기 때문입니다. 명목적(이름 기반) 타입 시스템의 엄격한 타입 체크는 어떤 때에 유용할까요? 먼저 간단한 예제를 봅시다.

```typescript
// Nominal Type System
type USD = { value: number };
type EUR = { value: number };

let dollors: USD = { value: 10; }
let euros: EUR = { value: 15; }
dollors = euros; // ❌ Error: USD와 EUR 타입은 다릅니다!

// Structural Type System
type USD = { value: number };
type EUR = { value: number };

let dollors: USD = { value: 10; }
let euros: EUR = { value: 15; }
dollors = euros; // ✅ OK: "value"라는 속성을 가지고 있으니 허용합니다...이러면 안 되는데?
```

이는 구조적 타이핑의 한계를 잘 나타냅니다. 명목적 타이핑 언어에서 이런 케이스는 문제거리조차 안 됩니다! 하지만 TypeScript같은 구조적 타이핑에선 이런 케이스가 쉽지 않았습니다.  

### TypeScript의 명목적 타입

TypeScript는 기본적으로 구조적 타입만 지원합니다. 하지만 Branding이라는 특정 조건 하에서는 **TypeScript에서도 명목적 타입을 생성**할 수 있습니다.

```typescript
type Brand<K, T> = K & { __brand: T };
type USD = Brand<number, "dollors">;
type EUR = Brand<number, "euros">;

let dollors = 10 as USD; // number가 아닌 USD 타입으로 취급합니다.
dollors.__brand; // undefined. 숫자면서 __brand 속성도 가진 특이한 타입.
dollors = 20; // ❌ Error: 일반 숫자는 할당 불가능.
dollors = 1 as EUR; // ❌ Error: 이름이 다른 타입을 USD 타입에 할당할 수 없습니다.
dollors = 100 as USD; // ✅ OK: USD 타입만 재할당 가능
```

위 코드에서 USD, EUR은 number이면서 동시에 __brand 속성을 가진 객체입니다. 여기에 as로 타입을 단언하면 **이름 기반의 유니크한 타입**이 됩니다. name-based type입니다. 명목적 타이핑이 구현됐습니다!

어떤가요? 유용하다는 생각이 드나요? 개인적으론 "이것만으론 공감이 덜 됐으리라"고 생각합니다. 좀 더 공감을 이끌어내보겠습니다. 

[TypeScript 5.2.2 playground](https://www.typescriptlang.org/play?ssl=56&ssc=18&pln=42&pc=1#code/PTAEEFQOwewWwJZQIYBtQBcCeAHApqAM5aEZ5yhx7JSGYAWyGo1AxvZrgQnQK5QIAjrzwAoEKBoATFgDc8UUAgBmnfHUbyGBQsiqgpTZKCwxeoVjVjNkhQggDmUcWGSsATjDtq8hAHSiLqAAKlwAyh4IOBgA5HTY+EQkZBQ8RBjuvKwYvO5oADSgAO70COyU1LRBKto+SnSEjPgyqAgA1gTGUllthQixdF09fqAAkqrIQQ4wXgSMg6joGPQ6ep0YGQgARrxkg4MGPYXLCko2qIQw1QfdrG0jAJpmFjSgqNTuinAw7nN4vwAuFgADz0OHeANImWyuTQAFoEkgHIEJMFSnRLIpNAQpHkils3G1CIVlD8QWD3tpfpJqZZCL4giV-p10u4kaAyVBeHAtv8XljkFpCPhWAg0BYYFAyMCbFAZKZeEEpJKYswijRmBgYHI+XBkB1arI0CJ4nlaMp-nktu8RgAxH5BPCguDgvAAlxBOGgUAAVXp7jGUBwu1AYU2UAcdAAFPxdBaAJSe73BM2EVBMBCS0PhyNJ33+sZSBQYFRlDNZgBy3N57kIefArFYvjowRgHSqQQA6gRMaAHHhmN9SBzVCdQEbUCJQMpPBRjLBECgllwgsRSORiv0OMZWhtKVt+iOQRljKwYEWAl28DFqdN2VrQLx6ZJFEgyLW8NlM0ufIUilvJEfARhDECQz1oE83yURQx1JdwKBgCZQBwTx8HcbAXkWPAZAAfRwrYzRkKNlh4a4JSgeQpW-eNilKco9Q6OhDwQF0vHsa0CAfWx7CcSQglgeDxShe9tWMAA1NAEEMMgpFGINdjDNkI0vBICAk1ppOwuTgwwRT2QAXlZdkADJQAAb1APCCOkIEACI-T5bSQwABS8Zh1Kk8soFs0AAF8AG4UTAbtN0WR9n2MZR+C-LMHxPc0fjnIyI0wK4JHEyTNNk+TdJzUAvR2TUVmQmAoKKH5lmgGASwjMjliYYpr2pAArJ9mBwshFiRHCQnCSJogYBr+jiTBMjwS9wOHCdPLIBz3Cc5hDKjJAdKBYSIxo-SAD5zNEb1JuYewXXeDysoW0BDJW3Y-F+cE3DwKNgAAHQAHmABxClswATIls+NAu9X4ck+IgWNdU6mC0nLJDocGZIWvSI0CgKgtACsYCKRr+QsX4IenaKS0lOgSjKDh-zCyVUCwSRGzwaIgjMAMoDwDGFyQcVVMKaQqqKgh+yZvJ0HWhwfAmwnmBQt8KzWC7QCjFAqCBWHIZ0hGHE2nazL28jLhtVAYAcOW1j+0RkaCe0AydCk8EKFZfhGy59FjZALWgnTp1nQCn3+Qo71qiRlk8XgHA4MdpukskuZORReXZNA9aKbDUtAXlkKUmT3VEA7XZDQzbLQf4MCjGIthgLYtipjBkA4wgYnjWzAqzsOIeyt3DKb2b-QW5acuNiWpSlqgo3b5XdmNoIAHkYOK6rbdARg5UKHBuPvYr+DhYeZCF1Kgj7jAB4IMn0DyHgWTPF0EHeC33E8dwM93-fu50seJCecxexxmRT3gFC8BWWgEC0DAeQ7hZAIGZkeE4SoVAWl+FKYoyASBJw8NQMgVVFzsy4MSF8MgTgIHcEEE8RY4SIWUExKeaQAAsAAGKhEo4BUDgXrFKABxfoAAJXgWx6iEBEO6EAQR6AbBwIQAEIAHBbk4X4M+wAACyZRPCXGUBgYAoR8ARDZNEYAPAeG+GAAAJioXoj06U5QMDSDgNy9RAIOBxodbkep3BYD4cAARQiREgEQOwNAAAvfOdwEBSPgMAVmS4ES4CRHCJAYT1D9WUaIIAA)에서는 Access Tokens, User Identification Numbers, Translation Strings, 안전성이 확보되지 않은 User Input Strings 등 "특별한 string, number에 대해서 일반적인 string, number로 처리하면 안 될 때" 사용한다고 서술합니다.  

아래는 브랜딩 기법을 활용해서 XSS(Cross-Site Scripting) 처리를 하는 간단한 예시입니다. 코드를 보기 전에 다시 강조하자면 브랜딩은 **유니크한 타입으로 구분해야만 할 필요가 있는 상황**에서 강력한 힘을 발휘합니다.

```typescript
type ValidatedInputString = string & { __brand: "User Input Post Validation" };

// 입력 글자에 코드 실행문이 있다면 필터링하고, branding 처리한 string을 return합니다.
const validateUserInput = (input: string) => {
  const simpleValidatedInput = input.replace(/\</g, "≤");
  return simpleValidatedInput as ValidatedInputString;
};

// 검증된 branding 문자열만 받아서 출력합니다.
const printName = (name: ValidatedInputString) => {
  console.log(name);
};

// 코드 실행하는 문자열 
const input = "alert('bobby tables')";

// 검증을 거친 문자열
const validatedInput = validateUserInput(input);

printName(validatedInput); // ✅ OK: 검증 후 브랜딩 처리된 string이므로 정상 처리
printName(input); // ❌ Error: 검증 안 된(브랜딩이 안 된) 일반 string은 실행 거부
```

## 마무리

Branding 기법은 제한적으로 명목적(이름 기반) 타입 시스템을 구현하는 묘기입니다. 이를 통해 TypeScript의 구조적 타입 시스템을 보완합니다. 이름 단위로 엄격하게 타입 체크할 필요가 있을 때 사용하도록 연습해봅시다!
