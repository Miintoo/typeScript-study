### useRef

&nbsp;&nbsp;&nbsp;&nbsp;`useRef`는 두 가지 용도로 사용합니다.

1. DOM을 참조
2. 그 외의 것을 참조

&nbsp;&nbsp;&nbsp;&nbsp;DOM을 참조할 땐 속성을 조회하거나, 변경하려는 목적입니다. 이 때는 `useRef`의 타입을 `RefObject<T>`으로 적용해야 합니다. 방법은 간단합니다.

1. `useRef<참조하려는 DOM의 타입>`을 입력한다.
2. 초기값을 `null`로 할당한다.

&nbsp;&nbsp;&nbsp;&nbsp;`null`과 `undefined`는 엄격히 구분됩니다. `null`은 없는 것이고 `undefined`는 할당이 안 된 것입니다. 그 DOM을 찾았거나, 못 찾았거나 둘 중 하나여야만 합니다. 이것이 `RefObject`타입입니다.  
&nbsp;&nbsp;&nbsp;&nbsp;한 편, DOM 참조가 목적이 아닐 땐 `MutableObject` 타입을 사용합니다. `useRef`는 컴포넌트가 언마운트할 때까지 보존되므로 렌더링에 영향을 안 미치거나, 리렌더링해도 값을 유지하고 싶은 상황에서 유용합니다.

```typescript
type User = { name: string };

const user: User = { name: "user" };
const otherUser: User = { name: "other user" };
const otherButton: HTMLButtonElement = document.createElement("button");

const buttonRef = useRef<HTMLButtonElement>(null); // RefObject 타입
const userRef = useRef<User>(user); // MutableObject 타입

userRef.current = otherUser; // ✅ MutableObject 타입은 current 통째로 변경이 가능합니다.
buttonRef.current = otherButton; // ❌ Error: RefObject의 current는 read-only입니다.
...

<button ref={buttonRef}
```

&nbsp;&nbsp;&nbsp;&nbsp;문서 주석에선 useRef를 클래스의 인스턴스 필드처럼 생각하고 사용하는 수도 있다고 적습니다. 마치 아래처럼요.

```typescript
class Person {
  name: string = "name";
}

const Person = () => {
  const nameRef = useRef<string>("name");
};
```

### useState

```typescript
function useState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>];
function useState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>
];
```

&nbsp;&nbsp;&nbsp;&nbsp;useState는 오버로딩이 두 개 있습니다. 보다시피 초기값을 입력하지 않으면 undefined 타입을 허용합니다. 또한 주목할 타입이 `Dispatch`와 `SetStateAction`인데요.

```typescript
type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;
```

&nbsp;&nbsp;&nbsp;&nbsp;즉 `Dispatch<SetStateAction<S>>`는 `Dispatch<S | ((prevState: S) => S)>`입니다. 이는 setState가 아래 두 가지 행동 케이스를 가짐을 뜻합니다.

1. 값을 직접 전달
2. 이전 상태값을 이용한 상태 변경 함수를 전달

&nbsp;&nbsp;&nbsp;&nbsp;2번의 경우는 `setState`를 연속 호출할 때 유용합니다.

```typescript
const [count, setCount] = useState(0);

// case 1
function A() {
  setCount(count + 1);
  setCount(count + 1);
} // count: 1

function B() {
  setCount((count) => count + 1);
  setCount((count) => count + 1);
} // count 2
```

&nbsp;&nbsp;&nbsp;&nbsp;케이스 1은 이전 상태 값을 이용하지 않기 때문에 마지막 호출만 유효합니다. 반면에 케이스 2는 이전 상태값을 연동하기 때문에 연속적으로 처리합니다. 그리고 이를 통해 props로 전달하는 setState의 타입도 올바르게 작성해봅시다.

```typescript
// Parent.tsx
const [count, setCount] = useState(0);
return <Children handleClick={setCount} />;

// Children.tsx
interface Props {
  handleClick: (num: number) => void; // ❌ 사용은 가능하지만 SetState인지 변수명으로만 추측해야 합니다.
}

interface Props2 {
  handleClick: Dispatch<SetStateAction<number>>; // ✅ handleClick이 SetState라는 것을 확실하게 명시합니다.
}
```

### UMD

node_modules에서 react폴더에 index.d.ts를 보면 다음과 같은 코드가 있습니다.

```typescript
export as namespace React;
```

위 코드의 의미는 UMD(Universal Module Definition) 모듈에도 대응이 가능하도록 타입을 export하겠다는 의미입니다. 그럼 UMD란 무엇일까요? 아래 코드를 봅시다.

```typescript
// 이 파일은 module 파일입니다.
function A(){...}
export default A;
```

```typescript
// 이 파일은 스크립트 파일입니다. html 파일에서 <script src="..." />으로 import해서 사용합니다.
function A(){...}
```

`export as`로 하면 타입이 전역적으로 선언됩니다.
