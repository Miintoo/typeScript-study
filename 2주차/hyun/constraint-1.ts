class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
//@ class의 extends는 super class의 속성을 반드시 충족해야 한다.
class User extends Person {
  nickname: string;
  constructor(name: string, nickname: string) {
    super(name);
    this.nickname = nickname;
  }
}

const user = new User("현", "Hamelln");

//@ type extends할 경우에도 뒤의 타입을 반드시 충족해야 사용 가능하다.
function getProperty<T, O extends keyof T>(obj: T, key: O) {
  return obj[key];
}
let obj = { a: 1, b: 2, c: 3 };

const a = getProperty(obj, "a"); // okay
const b = getProperty(obj, "z"); // error: "z"는 "a", "b", "c" 속성에 해당하지 않습니다.

//# useDebounce 훅
//@ 어떤 매개변수가 들어올지 모르므로 모든 타입의 배열을 허용.
type Callback<T extends any[]> = (...args: T) => void;

const useDebounce = <T extends any[]>(
  func: Callback<T>,
  wait: number = 800
): Callback<T> => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  return (...args: T) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      func(...args);
    }, wait);
  };
};
