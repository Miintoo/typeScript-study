# 목표

> _타입스크립트 5.0에 추가된 데코레이터에 알아보고 연습합니다._

&nbsp;&nbsp;&nbsp;&nbsp;_Editor's note: 이 글은 객체 지향 프로그래밍(OOP)을 아는 독자를 대상으로 작성했습니다. 이 글에서 '객체'는 모듈, class, 컴포넌트, 혹은 함수일 수도 있습니다. 구체적인 개념보단 넓은 관점으로 봐주세요._

### 데코레이터 패턴

&nbsp;&nbsp;&nbsp;&nbsp;타입스크립트의 데코레이터는 [데코레이터 패턴](https://en.wikipedia.org/wiki/Decorator_pattern)을 일부 지원하는 기능으로 **클래스에서만 사용할 수 있습니다(2023/10 기준).** 데코레이터 패턴은 1994년 Gang of Four의 [디자인패턴: 재사용 가능한 객체 지향 프로그래밍의 요소](https://en.wikipedia.org/wiki/Design_Patterns)에서 제시한 디자인 패턴으로 [SOLID 원칙](https://en.wikipedia.org/wiki/SOLID)의 S(SRP)와 O(OCP)를 지키기 좋은 패턴입니다.

- 단일 책임 원칙 (Single Responsibility Principle, SRP)  
  객체는 책임을 한 가지만 가져야 합니다. 한 객체가 여러 책임을 가지면 코드는 번잡해집니다.

- 개방 폐쇄 원칙 (Open-Closed Principle, OCP)  
  객체는 확장에 대해선 개방적이되, 수정에는 폐쇄적이어야 합니다.  
  즉, 새 기능을 도입할 땐 객체 코드를 수정하지 말고 새 코드를 추가합니다.

### 유연성과 확장성

&nbsp;&nbsp;&nbsp;&nbsp;서비스에서 객체들은 처음엔 간단한 기능만 지원합니다. 그러다 서비스가 커질수록 기능은 많아지고 경우의 수는 여러 갈래로 늘어납니다. 예를 들면 옛날 커피 자판기는 전부 메뉴, 맛, 양이 같았습니다. 하지만 오늘날엔 어떤가요? 아래 그림으로 감당이 가능한가요?

![SmartSelect_20231023-203237_Samsung Notes](https://github.com/hamelln/typescript-dive-notes/assets/39308313/709b4402-dd57-40a6-abfa-c26f0fd020c7)

_<p><strong>문제 1. 메뉴가 많아졌습니다.</strong></p>_

대응: 많은 가게가 고급 원두 머신을 사용합니다. 메소드를 대폭 업데이트해야겠군요.

![SmartSelect_20231023-203818_Samsung Notes](https://github.com/hamelln/typescript-dive-notes/assets/39308313/0254564b-d3eb-43e4-b64f-15156ccb7878)

_<p><strong>문제 2. 브랜드와 머신 종류가 많습니다.</strong></p>_

대응: 인터페이스로 틀을 만들고 각 객체마다 구현을 맡깁시다.

![SmartSelect_20231023-204140_Samsung Notes](https://github.com/hamelln/typescript-dive-notes/assets/39308313/f418b0f4-627b-48b1-b02f-77f44fbb60a1)

_<p><strong>문제 3. 브랜드마다 레시피가 다릅니다.</strong></p>_

&nbsp;&nbsp;&nbsp;&nbsp;카페라떼를 생각해봅시다. 어디는 시나몬, 혹은 시럽을 넣고 들어가는 원두의 종류, 양, 우유의 온도, 양이 각자 다릅니다. 그러나 <strong>다들 원두를 분쇄하고 에스프레소를 만들고 데운 우유를 사용합니다.</strong> 재사용성이 엿보이는 로직은 **데코레이터로 분리**할 수 있습니다.

### 데코레이터

> _<strong>객체 고유의 기본 메소드를 만들고, 그 외에는 필요에 따라서 추가 기능을 덧붙입니다.</strong>_

![SmartSelect_20231023-205352_Samsung Notes](https://github.com/hamelln/typescript-dive-notes/assets/39308313/bec103af-956c-4e27-a57e-cde36bb44045)

```typescript
class StarbucksMachine extends VarietyMachine {
  coffeeBeans = 1000; // 머신에 있는 원두의 양
  water = 1000; // 머신에 있는 물의 양
  desiredMilkTemperature = 75; // 우유를 데우는 온도

  @grindCoffeeBeans(20) // 원두를 20g 분쇄합니다.
  @extractEspresso(50) // 에스프레소를 50ml 추출합니다.
  @heatMilk(140) // 우유를 140ml 데웁니다.
  caffelatte() {
    console.log(
      `Starbucks만의 고유 재료와 비법 레시피를 이용한 카페라떼를 만듭니다...`
    );
    console.log(`Starbucks 카페라떼가 나왔습니다.`);
  }

  @grindCoffeeBeans(20)
  @extractEspresso(40)
  @heatMilk(80)
  cappuccino() {
    console.log(
      `Starbucks만의 고유 재료와 비법 레시피를 이용한 카푸치노를 만듭니다...`
    );
    console.log(`Starbucks 카푸치노가 나왔습니다.`);
  }
}

function grindCoffeeBeans(beanGrams: number) {
  return <Class extends VarietyMachine>(
    target: Function,
    context: ClassMethodDecoratorContext
  ) =>
    function <Args extends any[]>(this: Class, ...args: Args) {
      this.coffeeBeans -= beanGrams;
      console.log(`원두를 ${beanGrams}g 분쇄합니다.`);
      const originReturn = target.apply(this, args);
      console.log(`머신에 원두가 ${this.coffeeBeans}g 남아있습니다.`);
      return originReturn;
    };
}

function extractEspresso(water: number) {
  return <Class extends VarietyMachine>(
    target: Function,
    context: ClassMethodDecoratorContext
  ) =>
    function <Args extends any[]>(this: Class, ...args: Args) {
      this.water -= water;
      console.log(`물을 ${water}ml 사용해서 에스프레소를 추출합니다...`);
      target.apply(this, args);
      console.log(`머신에 물이 ${this.water}ml 남아있습니다.`);
    };
}

function heatMilk(milk: number) {
  return function <Class extends VarietyMachine>(
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    return function <Args extends any[]>(this: Class, ...args: Args) {
      while (this.milkTemperature < this.desiredMilkTemperature) {
        this.milkTemperature++;
      }
      console.log(`${milk}ml의 우유를 ${this.milkTemperature}도로 데웠습니다.`);
      target.apply(this, args);
    };
  };
}
```

&nbsp;&nbsp;&nbsp;&nbsp;우유를 사용하는 메뉴에만 `heatMilk`를 선택적으로 쓰고 에스프레소, 우유 양도 자유롭게 조정됩니다. 필요한 때에 필요한 것만 가져와 `base`를 꾸미고(decorate) 어느 브랜드, 어느 머신에도 유연하게 대처할 준비가 됐습니다. 어떤가요?

### 클래스 데코레이터

아래와 같이 클래스 자체를 decorate할 수도 있습니다.

```typescript
function withEmploymentDate<Constructor extends { new (...args: any[]): {} }>(
  baseClass: Constructor,
  context: ClassDecoratorContext
) {
  return class extends baseClass {
    employmentDate = new Date().toISOString();
    constructor(...args: any[]) {
      super(...args);
      console.log(`${baseClass.name}에 입사일 속성을 추가했습니다.`);
    }
  };
}

@withEmploymentDate
class Employee {
  calcPay() {}
}

const employee = new Employee(); // Employee에 입사일 속성을 추가했습니다.
```

### accessor 데코레이터

accessor는 TS 4.9에 추가된 기능으로 내부적으로 해당 속성을 은폐하고 getter, setter로 조회하는 접두사입니다.

```typescript
// 개발자가 작성한 코드
class Person {
  accessor name: string;
}

// 실제로 작동하는 코드
class Person {
  #__name: string;
  get name() {
    return this.#__name;
  }
  set name(value: string) {
    this.#__name = name;
  }
}
```

getter, setter는 그 책임에만 충실해야 합니다. 그렇다면 이런 민감한 속성의 변화는 어떻게 관찰하면 좋을까요? 데코레이터가 이를 돕습니다.

```typescript
class User {
  @watchChange
  accessor nickname: string = "John Doe";

  @watchChange
  accessor password: string = "1234";
}

const user = new User();
user.nickname = "ilovecoffee"; // 사용자의 nickname이(가) John Doe에서 ilovecoffee로 변경되었습니다.
user.password = "1q2w3e4r"; // 사용자의 password이(가) 1234에서 1q2w3e4r로 변경되었습니다.

function watchChange<This, Value>(
  accessor: {
    get: (this: This) => Value;
    set: (this: This, value: Value) => void;
  },
  context: ClassAccessorDecoratorContext<This, Value>
) {
  return {
    get: function (this: This) {
      return accessor.get.call(this);
    },
    set: function (this: This, value: Value) {
      console.log(
        `사용자의 ${context.name.toString()}이(가) ${accessor.get.call(
          this
        )}에서 ${value}로 변경되었습니다.`
      );
      accessor.set.call(this, value);
    },
  };
}
```

## 마치며

> _&nbsp;&nbsp;&nbsp;&nbsp;이 외에도 타입스크립트에서 추천한 포스팅에선 메소드 전후처리, 직렬화 및 역직렬화의 자동 처리, 의존성 주입, 런타임에서 타입 평가 등 다용도로 사용한다고 서술합니다.  
> &nbsp;&nbsp;&nbsp;&nbsp;디자인 패턴은 **그때의 문제를 해결하기 위해 탄생한 개념이지, 모든 프로그램에 적용하기 좋은 정석이 아님**을 명심하세요. 데코레이터 역시 무조건적인 개선을 보장하지는 않습니다. 따라서 팀원들, 혹은 스스로에게 다시금 물어보세요.  
> "지금 문제를 개선하기 위해서는 데코레이터가 적절한가?"_

### 참조

- [안택수(2023.10). AOP in TypeScript. NAVER D2](https://d2.naver.com/helloworld/3010710)
- [Concise Developer(2023.08). TypeScript 5 decorators - full course](https://www.youtube.com/watch?v=1hq_tNPWASM)
