//# unknown: "무슨 타입인지 아직 모른다."
type Result =
  | { success: true; value: unknown }
  | { success: false; error: Error };

function tryDeserializeLocalStorageItem(key: string): Result {
  const item = localStorage.getItem(key);
  if (item === null) {
    return { success: false, error: new Error(`"${key}"를 못 찾음`) };
  }

  let value: unknown;
  try {
    value = JSON.parse(item);
  } catch (error) {
    return { success: false, error: new Error(`JSON 평가 실패`) };
  }

  return { success: true, value };
}

const result = tryDeserializeLocalStorageItem("dark_mode");
//@ unknown은 무슨 타입인지 확실히 지정하면 사용할 수 있다.
if (result.success) {
  const darkModeEnabled: unknown = result.value;
  if (typeof darkModeEnabled === "boolean") {
  }
} else {
  //? Result 타입에서 success: false일 땐 error 속성이 존재
  console.error(result.error);
}
