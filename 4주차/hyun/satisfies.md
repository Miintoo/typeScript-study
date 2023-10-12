# 목표

> satisfies를 이용한 안전한 타입 캐스팅을 이해하고 연습합니다.

모든 TypeScript 개발자는 빠른 오류 검사를 위해 타이핑을 합니다. 하지만 타이핑(혹은 타입 추론)이 언제나 좋은 친구이기만 했을까요? 우리를 괴롭게 한 적은 없었나요? 아래의 상황을 봅시다.

```typescript
let bool = false; // ❓ boolean으로 추론하는 것 같지만...

function changeBool() {
  const someCondition = true;
  if (someCondition) bool = true;
}

changeBool();

bool === true; // ❌ ts2367 Error: false와 true는 타입이 다릅니다. 서로 다른 타입끼리 비교하지 마세요.
bool = false as boolean; // 😞 as로 단언
bool === true; // 😓 통과
```

위와 같은 상황은 조금 특수한가요? 다음 같은 상황도 생각해봅시다.  
고객: "기간 한정 행사 웹사이트를 만들어주세요. **각 요소마다 마우스 클릭 시에 고유한 알림 메시지를 띄워주세요.**"

HTML 엘리먼트는 많은 종류가 있습니다. 모든 요소에 마우스 클릭 이벤트를 등록하려면 아래와 같이 작성해야 합니다.

```typescript
function onClick1(event: MouseEvent<HTMLAnchorElement>) { printMessage(event...) }
function onClick2(event: MouseEvent<HTMLBodyElement>) { printMessage(event...) }
function onClick3(event: MouseEvent<HTMLButtonElement>) { printMessage(event...) }
function onClick4(event: MouseEvent<HTMLInputElement>) { printMessage(event...) }
```
하는 내용은 다 똑같은데 이벤트 타입은 매번 일일이 지정합니다. 고통스러운 일이네요! (다행히도 위의 코드는 extends와 Generic으로 해결할 수 있습니다.)  

타입이 최대한 엄격한 게 좋지만은 않다는 사실을 환기했으니 본론으로 들어가봅시다.  
satisfies의 등장 전후로 무엇이 변했을까요?  

### safe-downcasting

타이핑은 엄격해서 귀찮음을 유발하기도 합니다. 아래 코드를 보죠.

```typescript
type Colors = "red" | "green" | "blue";
type RGB = [red: number, green: number, blue: number];

const palette1: Record<Colors, string | RGB> = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
};

palette1.red.map(0); // ❌ Error(ts2339): 타입이 배열로 확정되지 않음. (string 가능성)
palette1.green.toUpperCase(); // ❌ Error(ts2339): 타입이 string으로 확정되지 않음 (배열 가능성)
```

타이핑에 따르면 모든 key의 값은 튜플 | string 타입입니다. 따라서 해당 값에서 배열이나 string 메소드를 쓰려면 타입을 좁혀야 합니다.

```typescript
if(typeof palette1.green === "string") { 
  palette1.green.toUpperCase();
 }
```

하지만 개발자 입장에선 값이 무슨 타입인지 뻔히 보이기 때문에 타입을 좁히기 귀찮습니다!  

```typescript 
const palette2 = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies Record<Colors, string | RGB>;

palette2.green.toUpperCase(); // ✅ OK: green은 string 타입으로 다운캐스팅 됐으므로 가능.
palette2.red = "#00ff00"; // ❌ Error(ts2322): red은 [number, number, number] 타입으로 다운캐스팅돼서 불가능.
```

**satisfies는 명시한 타입을 만족할 경우 자동으로 다운 캐스팅을 합니다. 즉, 타입을 좁힙니다.**  
red는 이미 튜플 타입으로 좁혀졌기 때문에 string 재할당이 불가능합니다.

### 실재하는 속성에만 접근

객체의 key 타입을 엄격하게 설정하지 않으면 잉여 속성이 허용됩니다. 아래 코드를 보죠.  

```typescript 
type Config = Record<string, string>;

const config: Config = {
  name: "hamelln",
  version: "1.0",
  service: "portfolio",
};

config.name223 = "asd"; // 😰 통과. 타입 명세에 따르면 문제는 없다...이래도 되나?
```

name223 속성 추가는 제가 원하는 동작이 아닙니다. 그러나 모든 케이스를 완벽하게 대비하기는 현실적으로 어렵습니다. 어떻게 하면 좋을까요?

```typescript
type Config = Record<string, string>;

const config2 = {
  name: "hamelln",
  version: "1.0",
  service: "portfolio",
} satisfies Config;

config2.name223 = "asd"; // ❌ Error(ts2551): 없는 속성에 접근 금지.
```

### 부분적 타이핑

타이핑은 만능이 아닙니다. 타이핑으로 해결이 쉽지 않은 케이스 중 하나는 부분적 타입입니다. 아래 코드를 보죠.

```typescript
interface Data {
  a: "A" | "B" | "C";
  b: number;
  c: string;
  d: string[];
}

const baseData1: Partial<Data> = {
  a: "A",
  b: 1,
};

const data1: Data = {
  ...baseData1, // ❌ Error(ts2322): 입력된 값이 타입과 정확히 부합하지 않는다. (baseTata의 타입은 옵셔널)
  c: "foo",
  d: ["asd"],
};
```

baseData는 a속성과 b속성이 있지만 타입스크립트는 baseData를 Partial 타입으로만 보기 때문에 값의 유무는 확인하지 않습니다.  
baseData의 타입을 Pick<Data, "a" | "b">로 지정하면 해결할 수 있습니다. 하지만 Data 타입이 변경되면 같이 변경해야 하는 번거로움이 있네요.  
satisfies는 이 문제를 좀 더 간결하게 해결합니다! 

```typescript 
const baseData2 = {
  a: "A",
  b: 1,
} satisfies Partial<Data>;

const data2: Data = {
  ...baseData2, // ✅ 통과! baseData: { a: "A"; b: number; }
  c: "foo",
  d: ["asd"],
};
```

위에서 봤듯이 satisfies는 타입이 안전하다고 확인하면 downcasting해서 타입을 좁힙니다.  
즉, baseData2는 Partial<Data>가 아니라 `{ a: "A"; b: number; }` 타입으로 변환됩니다. 따라서 data2의 타입 체크가 통과됩니다.  

### 안전한 타입 단언

`as`는 TypeScript 사용자들이 기피하지만, 어쩔 수 없이 사용할 상황이 발생할 수도 있습니다. 알다시피 개발에 있어 '절대'라는 건 없으니까요.  
외부에서 가져온 데이터가 `User` 타입인지 점검하고, `User` 타입으로서 `return`하려면 어떻게 해야 할까요?  
보통은 `is User`를 사용하는 게 안전합니다. 하지만 그마저도 여의치 않으면 `as User`라고 단언해서 보내야할 때가 있습니다.

```typescript
interface User {
  name: string;
  location: string;
}

const user1 = {
  name: "태현",
  location: "경기",
} as User;

// ...

return user1;
```

하지만 as의 고질적인 문제는 '타입 점검을 전혀 안 한다는 것'입니다. 아래 케이스는 심각해지겠죠.

```typescript 
// ❓ 어느 날 User에 major 속성이 추가됐다면?
interface User {
  name: string;
  location: string;
  major: "frontend" | "backend"; // 속성 추가.
}

// ❗ 에러가 날 상황인데 as 때문에 그냥 통과시켜버린다!
const user2 = {
  name: "태현",
  location: "경기",
} as User;
```

satisfies는 타입 체크, as는 타입 단언을 합니다.  
둘을 섞으면 어떻게 될까요? 타입 체크 ➭ 타입 단언을 합니다!

```typescript 
const user = {
  name: "태현",
  location: "경기",
} satisfies User as User; // ❌ Error(ts1360): major 속성을 입력하시오.
```

타입 명시와 일치하는지 확인한 다음에 단언하기 때문에 안전하게 타입을 단언할 수 있습니다!

### 타입 업캐스팅

여태까지 satisfies가 타입 다운 캐스팅만 했는데요. 타입 업캐스팅으로 사용할 수도 있습니다.  

```typescript
interface Gamer {
  id: string;
  name: string;
  nickname: string;
  joinDate: string;
  friends: string[];
  gameMoney: number;
  cash: number;
  totalUsedGameMoney: number;
  // 그 외 40개가 넘는 정보들.
}

const gamer281: Gamer = {
  id: "1232-a281",
  name: "이태현",
  nickname: "hamelln",
  joinDate: "2023-03-23",
  friends: ["id1", "id2", "id3"],
  gameMoney: 203022,
  cash: 20000,
  totalUsedGameMoney: 2202200,
  // 그 외 40개 넘는 정보들.
};
```

위의 코드를 봅시다. 게이머에게는 많은 정보가 있는데요. 게이머들을 대상으로 이벤트를 진행한다고 가정합시다.  
당첨자를 발표하기 위해서 최소한의 정보만 조회하고 그 외에는 참조하지 않아도 되는데요. 이럴 때 타입 업캐스팅을 사용하면 좋습니다.

```typescript
type EventParticipants = { id: string; name: string; nickname: string, phone: string };

function personalize(gamer: Gamer) {
  return gamer satisfies EventParticipants as EventParticipants;
}

const person = personalize(gamer281);
person.cash // ❌ Error(ts2339): EventParticipants 타입에 없는 속성입니다!
```

Gamer는 EventParticipants 타입을 만족하기 때문에 satisfies EventParticipants를 통과합니다. 하지만 gamer에는 EventParticipants 타입 말고도 여러 값들이 실재하기 때문에 EventParticipants 타입으로 바뀌진 않습니다.  
이 때 `satisfies EventParticipants as EventParticipants`를 사용하면 Gamer 타입은 EventParticipants 타입으로서 참조됩니다. 타입을 체크하고 속성을 적게 만드는 안전한 타입 업캐스팅이 구현됐습니다!  

다른 사용 예시를 생각해봅시다. Jest의 테스트 환경은 Node.js나 Jsdom입니다. BOM을 완벽하게 지원하지 않기 때문에 관련 객체를 mocking해야 하는데요. 이 때 타입 업캐스팅을 사용해서 "필요한 속성만 mocking"하는 수도 있습니다.  

## 마무리

satisfies는 본래 수 년 전에 '타입 호환성이 적절한지 판단'하고 싶어서 제안이 되었지만 제안서 stage가 진행되면서 추가적인 변화를 거쳤습니다. 매우 멋진 기능이니 연습하면서 익숙해집시다!
