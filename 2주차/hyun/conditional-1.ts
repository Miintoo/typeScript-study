type Appetizer = "샐러드" | "피클";
type Main = "스테이크" | "생선찜";
type Dessert = "아이스크림" | "샤베트" | "커피";

const currentFood = "샐러드";

//@ type의 extends는'부분집합'인지만 초점을 맞춰서 체크.
/**
 * currentFood ⊆ Appetizer일 경우: Main
 * currentFood ⊆ Main일 경우: Dessert
 * 그 외: Appetizer.
 */
type NextFood = typeof currentFood extends Appetizer
  ? Main
  : typeof currentFood extends Main
  ? Dessert
  : Appetizer;

type Meal = "스테이크" | "생선찜" | "파스타" | "비빔밥";
//@ Meal은 Main의 부분집합이 아니므로 never로 지정된다.
type Example = Meal extends Main ? Meal : never;
