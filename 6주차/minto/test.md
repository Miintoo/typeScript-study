## React에서 사용하는 hook들 직접 타입 선언 해보기

### useState

```js
const [apple, setApple] = useState('현주');
const [count, setCount] = useState(1);
const [userInfo, setUserInfo] = useState({
  name: 'minto',
  age: number
})

declare namespace React {
  const useState: <T>(initial: T) => [T, (value: T) => void]
}
```
