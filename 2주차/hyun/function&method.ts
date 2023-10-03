//? 함수의 rest 문법은 마지막 자리에만 적용 가능.
function badRestFunc(...a: string[], b: number) {
  return b;
}

function goodRestFunc(a: string, ...b: number[]) {
  return a;
}

type TimeArray = [number, string, boolean];
const arr: TimeArray = [23, "한국", true];

const timeFunc = ([a, b, c]: TimeArray) => {
  console.log(a, b, c);
};

const timeFunc2 = (...args: [number, string, boolean]) => {
  const [a, b, c] = args;
  console.log(a, b, c);
};

timeFunc(arr);
timeFunc2(...arr);

function exam(this: Window) {
  console.log(this);
}

interface Props {
  initialCarouselImage: string;
  images: string[];
}

//@ 함수나 컴포넌트에서 구조 분해 할당할 땐 별도로 타입 선언해두는 게 편리
const Component = ({ initialCarouselImage, images }: Props) => {};

//@ 이것도 가능하지만, 보기에 불편함.
const Component2 = ({
  initialCarouselImage,
  images,
}: {
  initialCarouselImage: string;
  images: string[];
}) => {};
