function withEmploymentDate<Constructor extends { new (...args: any[]): {} }>(
  baseClass: Constructor,
  context: ClassDecoratorContext
) {
  return class extends baseClass {
    employmentDate = new Date().toISOString();
    constructor(...args: any[]) {
      super(...args);
      console.log(`${baseClass.name} 클래스에 입사일 속성을 추가했습니다.`);
    }
  };
}

@withEmploymentDate
class Employee {
  calcPay() {}
}

const employee = new Employee();
employee.calcPay();
