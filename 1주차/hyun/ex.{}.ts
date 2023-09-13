//# {}: 빈 객체 타입. nullish 제외하고 모든 타입 할당되지만 조작은 불가능.
const emptyObject: {} = 1;
emptyObject.name = "name"; // 에러
