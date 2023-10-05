//❗ private: '컴파일' 단계에서만 은폐.
class PrivateKeyword {
  private value = 1;
}

//❗ 런타임엔 아래와 같이 public으로 변환된다.
class PrivateKeywordWithRuntime {
  value = 1;
}

// 🔖 결국 자식 클래스는 private 속성도 '몰래' 상속받는다.
// 🚫 따라서 자식 클래스에서 똑같은 이름의 비공개 속성을 선언할 수 없다.
class PrivateKeyword2 extends PrivateKeyword {
  value = 1; // ❌ Error(ts2415): 부모 클래스와 같은 이름의 private 속성 선언 금지.
}

const testClass = new PrivateKeyword();
// ❗ 아래 코드는 '컴파일 에러'가 난다.
// 하지만 '런타임 에러'는 안 나기 때문에 타입 무시 주석을 붙이면 정상 실행된다!
// @ts-expect-error
testClass.value; // 1

// 📘 #: 런타임에도 완전 은폐(철저한 캡슐화).
// 🧐 hasOwn()으로 속성 조회 불가능
// 🧐 JSON.stringify으로 직렬화할 때에도 배제.
class PrivateFieldClass {
  #value = 1;
  value2 = 2;
}

class B extends PrivateFieldClass {
  #value = 2; // ✅ 부모 클래스와 같은 이름의 # 속성 선언 가능.
}

class Class extends PrivateFieldClass {}

const c = new Class();
c.#value; // ❌ Error(ts18103): 클래스 외부에서 비공개 속성에 접근하지 마시오.
c.value2;
