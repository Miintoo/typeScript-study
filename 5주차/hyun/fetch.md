```typescript
// 기본 요청 타입을 확장합니다. interface로 해도 되고 type으로 해도 됩니다.
type Method = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
type StrictRequestInit = RequestInit & { method: Method };

const options: StrictRequestInit = { method: "POST" };
```

```typescript
// 기본 에러 타입을 확장합니다. 이 경우는 에러 객체이므로 class로 작성합니다.
interface ErrorProps<T> {
  name: T;
  message: string;
  cause?: any;
}

export default class ErrorBase<T extends string> extends Error {
  name: T;
  message: string;
  cause?: any;

  constructor({ name, message, cause }: ErrorProps<T>) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}

type ErrorName =
  | "NOT_FOUND_ERROR"
  | "URI_ERROR"
  | "TYPE_ERROR"
  | "NETWORK_ERROR"
  | "SERVER_ERROR"
  | "ERROR";

interface BreweryErrorConstructor {
  name: ErrorName;
  message: string;
  cause?: any;
}

export class BreweryError extends ErrorBase<ErrorName> {
  constructor({ name, message, cause }: BreweryErrorConstructor) {
    super({ name, message, cause });
  }
}
```

```typescript
// ... 서비스 layer 코드
// 커스텀한 에러 객체를 사용합니다.
private validateResponse(response: Response): void {
  if (!response.ok) {
    if (response.status === 404) {
      throw new BreweryError({
        name: "NOT_FOUND_ERROR",
        message: "주소 에러: 요청하신 주소의 형식이 맞지 않습니다.",
      });
    } else if (response.status === 0) {
      throw new BreweryError({
        name: "NETWORK_ERROR",
        message:
          "네트워크 에러: 서버와 연결 중 문제가 발생했습니다. 인터넷 연결 상태를 확인해주세요.",
      });
    } else {
      throw new BreweryError({
        name: "SERVER_ERROR",
        message: "서버 에러: 서버 응답이 실패했습니다.",
      });
    }
  }
}
```
