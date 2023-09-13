//# Symbol(description: string): symbol. 즉시 생성 후 반환. 지역적
//# Symbol.for(key: string): symbol. 심볼 레지스트리에 있으면 반환, 없을 땐 생성. 전역적.
const author = Symbol.for("author");

interface PersonConstructor {
  [author]: string;
  author: string;
}

class Person implements PersonConstructor {
  [author]: string;
  author: string;
  //! 매개변수 이름이 심볼 이름과 겹치면 Error.
  constructor(symbolAuthor: string, realAuthor: string) {
    this[author] = symbolAuthor;
    this.author = realAuthor;
  }

  print() {
    console.log(`저자의 심볼: ${this[author]}`);
    console.log(`저자의 이름: ${this.author}`);
  }
}

const zeroCho = new Person("제로초", "조현영");
zeroCho.print(); // 저자의 심볼: 제로초, 저자의 이름: 조현영
