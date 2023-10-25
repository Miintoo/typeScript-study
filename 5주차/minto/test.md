## forEach 만들어보기

forEach는 반환값이 없다. 내부 콜백에는 세가지 인자가 들어간다.

```js
interface Array<T> {
  myForEach(callback: (v: T, i: number, a: T[]) => void): void;
}
```

## map 만들어보기

- map의 경우 내부 콜백에도 반환값이 존재하고 메서드 자체적으로도 반환값이 존재한다.
- 각 콜백의 반환값을 배열로 뭉쳐서 반환을 해준다.
- 인자로 받는 배열을 어떻게 가공해서 반환할지 모르기 때문에 T를 그대로 쓰기보다 새로운 제네릭 타입이 필요하다.

```js
interface Array<T> {
  myMap<U>(callback: (v: T, i: number, a: T[]) => V): V[];
}
```

## filter 만들어보기

- 내부 콜백에서는 boolean 타입으로 반환하고 전체 반환값은 입력으로 받은 T를 배열 형태로 반환한다.

```js
interface Array<T> {
  myFilter(callback: (v: T, i: number, a: T[]) => boolean): T[];
}
```
