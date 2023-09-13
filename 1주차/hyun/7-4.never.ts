//# never: 절대 실행될 수 없는 타입.
//@ switch의 완벽성을 보장하는 용도 등으로 쓴다.
enum Flower {
  Rose,
  Daisy,
  Tulip,
}

const flowerLatinName = (flower: Flower) => {
  switch (flower) {
    case Flower.Rose:
      return "Rosa rubiginosa";
    case Flower.Daisy:
      return "Bellis perennis";
    default:
      //? Tulip 케이스 때문에 발생이 가능하므로 Error
      const _exhaustiveCheck: never = flower;
      return _exhaustiveCheck;
  }
};

//@ 에러를 던지는 코드와 무한 실행 코드도 비슷한 원리다.
//? 절대로 뭔가를 return할 일이 없음. 그러므로 반환 타입이 never
function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("fetching 허용 시간 초과")), ms)
  );
}

function keepProcessing(): never {
  while (true) {} // return에 다다를 수 없다.
}
