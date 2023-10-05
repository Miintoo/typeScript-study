## 콜백 함수의 매개변수는 생략 가능하다.

```js
function example(callback: (error: Error, result: string) => void) {}

example((e, r) => {});
```

위와 같이 함수의 인자로 콜백 함수를 넣을 때 사용하는 타입에 대한 챕터이다.

- 함수를 호출할 대 내부에 선언한 콜백은 내부적으로 타입을 작성하지 않아도 된다. 이 때 자동으로 문맥적 추론을 통해 타입을 추론한다.
- 옵셔널 타입을 작성해주지 않아도 호출할 때 콜백함수 내부에 매개 변수를 입력해주지 않아도 된다.
- 만일 ?옵셔널을 붙혀 사용하면 undefined 값도 사용될 수 있기 때문에 옵셔널 타입으로 작성하지 않도록 해야한다.
- 반환값이 void일 경우 어떤 타입이 반환되어도 상관없다. 하지만 해당 값이 어디서 활용되지는 않는다.

```js
forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
```

마지막 예시는 forEach 내부 메서드에 선언부를 확인해보면 알 수 있다. void를 반환해서 어떤값이 반환되어도 에러를 발생시키지 않지만 반환값을 사용하지 못한다.

## typescript에서의 class 사용

typescript 환경에서 class 문법을 사용할 때 생기는 특징들에대해서 정리했다.

1. class 내부에 맴버 변수를 한 번더 작성해줘야한다.
2. 맴버 변수와 constructor 내부 값은 짝이 맞아야한다.

```js
class Person {
  name;
  age;
  married;
  contructor(name: string, age: number, married: boolean) {
    this.name = name;
    this.age = age;
    this.married = married;
  }
}
```

3. implements 예약어를 통해서 클래스 맴버가 들어있는지 더욱 엄격하게 검사할 수 있다.

```js
interface Human {
  name: string;
  age: number;
  married: boolean;
}

class Person implements Human {
  name;
  age;
  married;
  contructor(name: string, age: number, married: boolean) {
    this.name = name;
    this.age = age;
    this.married = married;
  }
}
```

4. 맴버 변수에 올 수 있는 옵션은 ?, readonly, private, public, protected 이다.

앞에 맴버 변수에 아무것도 입력해주지 않으면 default로 public으로 설정된다.

private는 인스턴스에서도 상속받은 class에서도 해당 맴버 변수를 사용하지 못하게 하는 속성이다.
protected는 private과 다르게 인스턴스에서만 사용이 불가능하도록 설정한 속성이다.

5. private 대신 typescript에서는 #을 사용하는게 좋다.
   ? 이유가 자바스크립트의 원래 기능과 더 가깝다는데 이해가안됨

6. implements 하는 속성은 모두 public이여야 한다.

7. 객체 내부 메서드를 오버라이딩 하는 경우 override 키워드를 붙혀서 선언해줘야한다.

8. abstract로 추상클래스를 선언해 implements 대신 사용할 수 있다.

abstract 키워드로 작성한 내부 맴버 변수나 함수는 모두 상속받은 class에서 명시해줘야 한다.

```js
abstract class AbstractPerson {
  name: string;
  age: number;
  married: boolean = false;
  abstract value: number;

  contructor(name: string, age: number, married: boolean) {
    this.name = name;
    this.age = age;
    this.married = married;
  }

  sayName() {
    console.log(this.name);
  }

  abstract sayAge(): void;
}

class RealPerson extends AbstractPerson {
  value: number = 0;
  sayAge() {
    console.log(this.age);
  }
}

```

## enum을 사용하지 않는 이유

```js
enum Direction {
  Up,
  Down,
  Left,
  Right,
}


'use strict'
var Direction
;(function (Direction) {
  Direction[(Direction['Up'] = 0)] = 'Up'
  Direction[(Direction['Down'] = 1)] = 'Down'
  Direction[(Direction['Left'] = 2)] = 'Left'
  Direction[(Direction['Right'] = 3)] = 'Right'
})(Direction || (Direction = {}))
```

일반적으로 enum은 여러 상수를 나열하고 이를 타입으로 명시하기 위해서 사용된다.

하지만 enum의 경우 공식문서에서도 사용을 지양하고 as const 문법을 통해 상수를 사용하라고 명시가 되어있다. 거기에 대한 이유는 무엇일까?

enum 자체는 js로 변환될때 없어지는게 아닌 그대로 js로 구현이 된다. 그리고 변환된 함수는 IIFE로 구현이 된다.

번들러들은 tree shaking을 통해서 export하지만 import 하지 않은 코드들을 자동으로 삭제해 번들된 크기를 줄이도록 하지만 IIFE로 구현된 함수의 경우 사용됐다고 판단해 그대로 번들되어 버리는 특징이 있다.

이 경우에 난 import하지 않았는데도 enum은 삭제 되는게 아닌 그대로 번들되어 성능에 영향을 끼칠 수 있다는 단점이 존재한다.
