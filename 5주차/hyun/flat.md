JS에는 n차원 배열을 n-m차원으로 변환하는 flat 메소드가 있습니다. 타입스크립트에선 flat 타입을 아래처럼 정의합니다.

```typescript
flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[]
```

flat은 FlatArray[]를 return합니다. 즉 FlatArray 타입만 이해하면 충분합니다.

```typescript
type FlatArray<Arr, Depth extends number> = {
  done: Arr;
  recur: Arr extends ReadonlyArray<infer InnerArr>
    ? FlatArray<
        InnerArr,
        [
          -1,
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20
        ][Depth]
      >
    : Arr;
}[Depth extends -1 ? "done" : "recur"];
```

코드로는 조금 헷갈리지만 그림으로 그려보면 아래와 같이 동작합니다.

![canvas_new-board-231026_1013](https://github.com/hamelln/typescript-textbook/assets/39308313/feb844c3-b598-4ce9-8c35-9274bdc7a1e1)

- Depth 만큼 전부 진행했으면 "done"을 return하고 그 외에는 "recur"를 return해서 재귀합니다.
- `Arr extends ReadonlyArray<infer InnerArr>`이 false인 경우는 `number extends number[]`처럼 **더 진행할 수 없는 경우**입니다.  
  이런 경우 FlatArray는 `{ "done": Arr, "recur": Arr }`이므로 `Arr`를 return합니다.
- 마지막으로, `flat()`이 `Arr[]`를 return합니다.
