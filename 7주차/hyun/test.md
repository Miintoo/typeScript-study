# 목표

> _패키지의 타입을 읽고, 작성하는 법을 이해합니다._

### 모듈

&nbsp;&nbsp;&nbsp;&nbsp;node_modules의 react폴더에는 `cjs` 폴더와 `umd` 폴더가 있습니다. 둘 다 react.development.js가 있는데 두 코드는 거의 다 똑같되 약간의 차이가 있습니다.

```javascript
/// umd/react.development.js
(function (global, factory) {
// CommonJS인지 확인(Node.js 등)
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
// Asynchronous Module Definition인지 확인(RequireJS 등)
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
// 브라우저인지 확인
  (global = global || self, factory(global.React = {}));
}(this, (function (exports) { 'use strict';
```

- CommonJS(CJS)  
  &nbsp;&nbsp;&nbsp;&nbsp;Node.js에서 사용합니다. 모듈을 동기적으로 로드하며 주로 백엔드에서 사용합니다.

- Asynchronous Module Definition(AMD)  
  &nbsp;&nbsp;&nbsp;&nbsp;주로 RequireJS에서 사용합니다. 모듈을 비동기적으로 로드하며 주로 프론트엔드에서 사용합니다. 요즘은 사용 빈도가 줄었습니다.

- ECMAScript Module(ESM)  
  &nbsp;&nbsp;&nbsp;&nbsp;일반적인 브라우저, 근래의 Node.js에서 사용합니다. 모듈을 비동기적으로 로드하고 import 시 트리 쉐이킹을 해 번들 크기를 줄입니다. CommonJS의 `require`는 동적으로 가져오고 내보낼 수 있어 런타임에만 평가가 가능하지만 import는 정적이기 때문에 런타임 전에 분석이 가능합니다.

- Universal Module Definition(UMD)  
  &nbsp;&nbsp;&nbsp;&nbsp;CJS, AMD 등 여러 케이스에 대응합니다. 똑같이 작성하더라도 CJS와 AMD는 작성법, 작동 방식, 효율이 다릅니다. 보통은 효율적인 방식을 먼저 시도해보고, 실패할 경우엔 UMD로 대응합니다. 크로스 브라우징, polyfill처럼 범용성 대비라고 생각하면 됩니다. react 패키지의 index를 보면 cjs로 먼저 접근합니다. 다만 AMD 사용률이 감소해서 UMD 사용도 같이 줄어들었습니다.

```javascript
if (process.env.NODE_ENV === "production") {
  module.exports = require("./cjs/react.production.min.js");
} else {
  module.exports = require("./cjs/react.development.js");
}
```

### tsc와 tsconfig

&nbsp;&nbsp;&nbsp;&nbsp;tsc는 TypeScript Compile입니다. 터미널에 `npx tsc`를 입력하면 타입스크립트가 자바스크립트로 컴파일됩니다. tsconfig에서 타입스크립트 컴파일에 대한 옵션을 지정할 수 있습니다.

```javascript
"compilerOptions": {
    "target": "es2016", // 컴파일된 JS가 실행되는 ECMAScript 버전.
    "module": "CommonJS", // 모듈 시스템 지정.
    "strict": true, // 모든 타입 체킹 옵션 활성화.
    "esModuleInterop": true, // ESM과의 호환성을 높이는 옵션. CommonJS 모듈을 ESM처럼 사용 가능합니다.
    "forceConsistentCasingInFileNames": true, // 파일명의 대소문자가 일치하지 않으면 오류를 발생시킵니다.
    "outDir": "dist", // 컴파일 결과물 저장 폴더. dist는 distribution(배포)의 줄임말입니다.
    "declaration": true, // 컴파일 후 d.ts(타입 정보를 담은 파일)을 생성합니다.
    "declarationDir": "types", // d.ts를 저장할 폴더.
    "rootDir": "."
}
```

&nbsp;&nbsp;&nbsp;&nbsp;보통 dist폴더에 컴파일 결과를 보관합니다. 브라우저는 타입스크립트를 실행할 수 없기 때문에 dist의 자바스크립트 코드를 사용합니다.

### 로컬 패키지

&nbsp;&nbsp;&nbsp;&nbsp;간단한 실습을 해봅니다. 아래와 같은 코드를 만들고 위 tsconfig의 컴파일 옵션을 만들고, package.json에서 컴파일 옵션을 지정합니다.

```typescript
// src/add.ts
const add = (x: number, y: number): number => x + y;
export default add;

// index.ts
import add from "./src/add";
export { add };

// package.json
{
  "name": "add-ts",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "types/index.d.ts"
}
```

&nbsp;&nbsp;&nbsp;&nbsp;`npx tsc`를 실행하면 dist 폴더와 types 폴더가 생성됩니다. `npm pack`을 실행하면 add-ts는 tgz 패키지 파일로 변환됩니다.  
&nbsp;&nbsp;&nbsp;&nbsp;이제 `npm i ../add-ts.tgz`나 `npm i ../add-ts(패키지 name)`으로 로컬 패키지 설치가 가능합니다.

```typescript
// 패키지 types/index.d.ts에서 타입을 참조합니다. add-ts의 package.json에서 그렇게 명시했기 때문입니다.
// 패키지 dist/index.js를 통해 함수를 사용합니다. add-ts의 package.json에서 그렇게 명시했기 때문입니다.
import { add } from "add-ts"; // ctrl을 누르고 add를 클릭하면 컴파일 결과물인 add.d.ts를 보여줍니다.
add(1, 2); // 3

// add.d.ts
declare const add: (x: number, y: number) => number;
export default add;
```

&nbsp;&nbsp;&nbsp;&nbsp;자바스크립트로만 만든 패키지를 배포할 땐 types.d.ts를 별도로 만들어서 등록하고 위처럼 package.json에서 types 참조를 명시하면 됩니다.

### @types

&nbsp;&nbsp;&nbsp;&nbsp;라이브러리를 사용할 때 @types를 같이 설치할 때가 많습니다. 작성할 땐 아래와 같이 합니다.

```typescript
// index.d.ts
declare function add(x: number, y: number): number;
export { add };

// package.json
{
  "name": "@types/add-js",
  "description": "Type definitions for add-js",
  "version": "1.0.0",
  "main": "",
  "types": "index.d.ts"
}
```

&nbsp;&nbsp;&nbsp;&nbsp;위와 같이 타입만 작성하면 됩니다. 타입스크립트는 타입이 없는 패키지를 발견하면 index.ts, index.d.ts 등이 있는지 살펴보고, 없으면 `@types/패키지`도 탐색합니다. 따라서 add-js, @types/add-js 두 개를 별도로 연동하지 않아도 자동으로 타입이 연결됩니다.

### 패키지 일부 타입 선언

&nbsp;&nbsp;&nbsp;&nbsp;패키지 전체를 @types로 적기 어려우면 사용하는 것만 d.ts를 적습니다.

```typescript
// types/add-js.d.ts
declare module "add-js" {
  export const add: (x: number, y: number) => number;
}
// tsconfig.json
  "compilerOptions": {
// 패키지 타입을 탐색할 경로들. types 폴더와 node_modules/@types 폴더를 탐색합니다.
    "typeRoots": ["./types", "./node_modules/@types"] // typeRoots를 명시하지 않았으면 @types는 자동 적용
  },
```

### JS -> TS 마이그레이션

```javascript
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true
  },

// calc.ts
const add = (x: number, y: number): number => x + y;
const minus = (x, y) => x - y; // 타입 적으라는 경고 but 사용 가능
export { add, minus };
```

## 마치며

> _개발할 때 라이브러리 타입을 볼 일이 많고, 직접 작성해야할 때도 있습니다. 연습을 통해 익숙해지도록 합시다._

### 참조

- [장호승(2022.10). CommonJS와 ESM에 모두 대응하는 라이브러리 개발하기: exports field. toss tech](https://toss.tech/article/commonjs-esm-exports-field)
- [Igor Irianto(2019.07). What the heck are CJS, AMD, UMD, and ESM in Javascript?](https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm)
