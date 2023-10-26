class User {
  @watchChange
  accessor nickname: string = "John Doe";

  @watchChange
  accessor password: string = "1234";
}

const user = new User();
user.nickname = "ilovecoffee";
user.password = "22231";

function watchChange<This, Value>(
  accessor: {
    get: (this: This) => Value;
    set: (this: This, value: Value) => void;
  },
  context: ClassAccessorDecoratorContext<This, Value>
) {
  return {
    get: function (this: This) {
      return accessor.get.call(this);
    },
    set: function (this: This, value: Value) {
      console.log(
        `${context.name.toString()}이 ${accessor.get.call(
          this
        )}에서 ${value}로 변경되었습니다.`
      );
      accessor.set.call(this, value);
    },
  };
}
