# overloading

![overloading-1](https://github.com/hamelln/typescript-textbook/assets/39308313/b7af46b7-7de4-45ff-8c9c-995aeeef0865)
![overloading-2](https://github.com/hamelln/typescript-textbook/assets/39308313/7d8c74eb-df63-4128-be33-24a8deaadfd1)

쓸 일이 많지는 않을 듯하다.  

# parameters & arguments

![params-args](https://github.com/hamelln/typescript-textbook/assets/39308313/1311448b-63d4-4072-91b2-acaaacbd9d95)

# private vs \#

![code](https://github.com/hamelln/typescript-textbook/assets/39308313/ef29570e-31ea-4ee0-a7c8-585dbf8b49ae)

# interface vs abstract class

![abstract-interface](https://github.com/hamelln/typescript-textbook/assets/39308313/e82d493d-285d-45b2-939c-0f26d416074e)

흔히들 라이브러리 vs 프레임워크를 논할 때 제한과 자유도를 언급한다.  

라이브러리: 이것저것 혼합해서 자유로운 구현이 가능하고 하나의 절대적 규칙이 없음.  
프레임워크: 템플릿대로 하는 강제성이 있는 대신 익숙해지면 편리.  

추상 클래스를 프레임워크로, 인터페이스를 라이브러리라고 생각해보자.  

추상 클래스: 완성된 기능과 템플릿이 있고 하나만 상속하기 때문에 구현 클래스에서 해야할 것이 다들 비슷하다.  
인터페이스: 여러 인터페이스가 섞일 수 있고 구현하는 대상이 제각각일 수 있다.  

# recursive type

![recursive-type](https://github.com/hamelln/typescript-textbook/assets/39308313/5fc82404-f32a-4f18-b74a-3fa8b1abf9d5)

# infer keyword

TypeScript는 자동 추론 기능이 있다.  
하지만 자동 추론만으로는 부족한 면이 있는데, 특정한 부분에서 타입을 추론해보라고 명시할 수 있다.  

![infer](https://github.com/hamelln/typescript-textbook/assets/39308313/8d4df6ff-ccdb-459f-8803-8321127bdb43)

infer는 extends와 같이 써야만 하고, 따로 쓸 수는 없다.

# type narrowing(타입 좁히기)

타입 좁히기는 중요한데, 요청해서 가져오거나 이벤트 분기를 처리할 땐 여러 가지 경우의 수가 있기 때문이다.  

![image](https://github.com/hamelln/typescript-textbook/assets/39308313/5832d12e-af5f-4f4e-906e-f33d26f4eb87)
![type-narrowing-1](https://github.com/hamelln/typescript-textbook/assets/39308313/5f59a381-4b68-4130-8670-6d77550b9275)

# enum과 reverse-mapping

![enum](https://github.com/hamelln/typescript-textbook/assets/39308313/8c825f2c-ec2b-40fd-a62c-83ddb1711117)

# generic 작명

![generic-writing](https://github.com/hamelln/typescript-textbook/assets/39308313/fb8b6849-1297-4216-b3cc-31d9ceab2fc7)

# 참조
- 조현영(2023.08). **타입스크립트 교과서.** 길벗
- [TypeScript 공식](https://www.typescriptlang.org/)
- [Dmitri Pavlutin(2023.03). TypeScript Function Overloading](https://dmitripavlutin.com/typescript-function-overloading/)
