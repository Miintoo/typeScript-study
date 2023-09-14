const tuple1: [number, string, boolean] = [1, "안녕하세요.", true];
//@ 그러나 push등의 메소드로 다른 index에 값을 만드는 게 허용된다.
tuple1.push(1);
//@ rest 문법을 쓸 수 있다. 그러나 이것도 새로 들어오는 타입은 엄격히 제한할 수 없다.
const tuple2: [number, ...string[], boolean] = [1, "안녕하세요.", true];
tuple2.push(0); // 에러 안 남
tuple2.push(true);
