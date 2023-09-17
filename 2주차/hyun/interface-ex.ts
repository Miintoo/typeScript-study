//# interface의 병합 기능은 라이브러리를 쓸 때 강력한 힘을 발휘한다.
export type ChangeEvent<T extends HTMLElement> = Event & {
  target: T & {
    name: string;
    value: string;
  };
};

export type FormEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>;

const handleFormData = (e: FormEvent) => {
  const key = e.target.name;
  const value = e.target.value;
};
