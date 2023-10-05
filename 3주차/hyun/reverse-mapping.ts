enum Color {
  Red = 1,
  Green = 2,
  Blue = 3,
}

Color.Green; // 일반적인 사용법

// 직렬화 - 역직렬화 등 특수한 케이스에선 reverse-mapping을 사용할 듯?
const colorName = Color[2];
console.log(colorName); // Green
