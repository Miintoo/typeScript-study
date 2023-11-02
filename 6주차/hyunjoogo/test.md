```typescript
import { ChangeEventHandler, useCallback, useState } from 'react';

const useInput = (validateOption: boolean) => {
  const [state, setInputState] = useState<string | null>(null);
  const [isInputError, setIsInputError] = useState<boolean>(false);

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = e.target.value;

      if (
        (validateOption && (value.length < 1 || value.length > 10)) ||
        (validateOption && value.trim().length === 0)
      ) {
        return setIsInputError(true);
      }

      setInputState(e.target.value);

      if (validateOption) {
        setIsInputError(false);
      }
    },
    [setInputState, validateOption],
  );

  return { state, isInputError, onChangeInput };
};

export default useInput;
```

```
    type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;
    type EventHandler<E extends SyntheticEvent<any>> = { bivarianceHack(event: E): void }["bivarianceHack"];


    interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
        target: EventTarget & T;
    }

    /**
     * currentTarget - a reference to the element on which the event listener is registered.
     *
     * target - a reference to the element from which the event was originally dispatched.
     * This might be a child element to the element on which the event listener is registered.
     * If you thought this should be `EventTarget & T`, see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682
     */
    interface SyntheticEvent<T = Element, E = Event> extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {}
```
