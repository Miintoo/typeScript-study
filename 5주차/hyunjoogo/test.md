# 정교한 문자열 조작을 위한 템플릿 리터럴 타입을 사용하자.

문자열을 조합할 때 사용하면 좋다. 아래는 QueryParam을 만들 때 예시이다.


```ts
type QueryParam<T> = T extends string | number ? `${string}=${T}` : never;

type QueryParams<T extends Record<string, any>> = {
  [K in keyof T]: QueryParam<T[K]>;
}[keyof T];

function buildURL<Params extends Record<string, any>>(
  baseUrl: string,
  endpoint: string,
  params: Params
): `${string}/${string}?${QueryParams<Params>}` {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return `${baseUrl}/${endpoint}?${queryString}`;
}

// Usage
const apiBaseUrl = 'https://api.example.com';
const apiEndpoint = 'search';

const queryParams = {
  q: 'typescript',
  page: 1,
  sort: 'relevance',
};

const searchURL: string = buildURL(apiBaseUrl, apiEndpoint, queryParams);
// Result: "https://api.example.com/search?q=typescript&page=1&sort=relevance"

```

`QueryParam`은 단일 값을 가져와 쿼리 매개변수 문자열로 변환하여 문자열 또는 숫자인지 확인합니다. 
`QueryParams`는 객체의 키를 매핑하고 각 키-값 쌍에 `QueryParam`을 적용하여 쿼리 매개변수를 통합합니다.


# Omit & Pick

`styled-components`를 사용하여 props로 전달한 값을 스타일에 쓰다가 알게 되었다.

아래 두개의 Props가 있다.

```ts
type AProps = {  
  value: string | number;  
  suffix: string;  
  
  $style?: CSSProp;  
} & HTMLAttributes<HTMLDivElement>;

type BProps = {  
  children: ReactNode;  
  label?: ReactNode;  
  $style?: CSSProp;  
};


const Layout = styled.div<Omit<AProps, "value" | "suffix">>`  
	CSS...
`;

const Layout = styled.div<Pick<BProps, "$style">>`  
  ${({ $style }) => css`  
    ${$style}  
  `}  
`;

```

AProps의 `value` 또는 `suffix`를 제외하고 사용하고 싶다면 `styled.div<Omit<AProps, 'value' | 'suffix'>>` 를 사용하면 된다. 이러면 `HTMLAttributes<HTMLDivElement>` 는 사용가능하다.

BProps의 `$style`만 사용하고 싶다면 `styled.div<Pick<Props, "$style">>` 를 사용하면 된다.

`Omit`은 `<Omit<대상, 제외할 것>>`이고, `Pick`은 `<Pick<대상, 선택할 것>>`이다.

# satisfies 

이런 식으로 사용하면 좋을 것 같은데 `Record<Step, ...>` 방식이 더 좋지 않을까라는 생각을 가집니다.

```ts
export type Step = 'inAction' | 'retrospect';

const SIDEBAR_INFO: Record<Step, { theme: string; stepKeyword: string; paragraph: string }> = {  
  inAction: {  
    theme: color.green[600],  
    stepKeyword: '행동 실행',  
    paragraph: '행동을 시작해봅시다.\n나의 행동을 메모하면 좋습니다.',  
  },    
};  
  
const satisfies_example = {  
  inaction: { // 오타  
    theme: color.green[600],  
    stepKeyword: '행동 실행',  
    paragraph: '행동을 시작해봅시다.\n나의 행동을 메모하면 좋습니다.',  
  },  
} satisfies {  
  [key in Step]: { theme: string; stepKeyword: string; paragraph: string };  
};
```
