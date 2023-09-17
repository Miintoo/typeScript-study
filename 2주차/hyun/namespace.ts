interface StringValidator {
  isAcceptable(s: string): boolean;
}
let lettersRegexp = /^[A-Za-z]+$/;
let numberRegexp = /^[0-9]+$/;
class LettersOnlyValidator implements StringValidator {
  isAcceptable(s: string) {
    return lettersRegexp.test(s);
  }
}
class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
// 시도해 볼 샘플
let strings2 = ["Hello", "98052", "101"];
// 사용할 검사기
let validators2: { [s: string]: StringValidator } = {};
validators2["ZIP code"] = new ZipCodeValidator();
validators2["Letters only"] = new LettersOnlyValidator();
// 각 문자열이 각 검사기를 통과했는지 표시
for (let s of strings2) {
  for (let name in validators2) {
    let isMatch = validators2[name].isAcceptable(s);
    console.log(`'${s}' ${isMatch ? "matches" : "does not match"} '${name}'.`);
  }
}

namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
  const lettersRegexp = /^[A-Za-z]+$/;
  const numberRegexp = /^[0-9]+$/;
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }
  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}
// 시도해 볼 샘플
let strings = ["Hello", "98052", "101"];
// 사용할 검사기
let validators: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
// 각 문자열이 각 검사기를 통과했는지 표시
for (let s of strings) {
  for (let name in validators) {
    console.log(
      `"${s}" - ${
        validators[name].isAcceptable(s) ? "matches" : "does not match"
      } ${name}`
    );
  }
}

namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Square {}
  }
}
import polygons = Shapes.Polygons;
let sq = new polygons.Square(); // 'new Shapes.Polygons.Square()'와 동일
