abstract class VarietyMachine {
  abstract coffeeBeans: number;
  abstract milkTemperature: number;
  abstract water: number;
  desiredMilkTemperature: number = 70;
  espresso(): void {}
  americano(water: number): void {}
  caffelatte(): void {}
  cappuccino(): void {}
}

function grindCoffeeBeans(beanGrams: number) {
  return <Class extends VarietyMachine>(
    target: Function,
    context: ClassMethodDecoratorContext
  ) =>
    function <Args extends any[]>(this: Class, ...args: Args) {
      this.coffeeBeans -= beanGrams;
      console.log(`원두를 ${beanGrams}g 분쇄합니다.`);
      const originReturn = target.apply(this, args);
      console.log(`머신에 원두가 ${this.coffeeBeans}g 남아있습니다.`);
      return originReturn;
    };
}

function extractEspresso(water: number) {
  return <Class extends VarietyMachine>(
    target: Function,
    context: ClassMethodDecoratorContext
  ) =>
    function <Args extends any[]>(this: Class, ...args: Args) {
      this.water -= water;
      console.log(`물을 ${water}ml 사용해서 에스프레소를 추출합니다...`);
      target.apply(this, args);
      console.log(`머신에 물이 ${this.water}ml 남아있습니다.`);
    };
}

function heatMilk(milk: number) {
  return function <Class extends VarietyMachine>(
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    return function <Args extends any[]>(this: Class, ...args: Args) {
      while (this.milkTemperature < this.desiredMilkTemperature) {
        this.milkTemperature++;
      }
      console.log(`${milk}ml의 우유를 ${this.milkTemperature}도로 데웠습니다.`);
      target.apply(this, args);
    };
  };
}

class StarbucksMachine extends VarietyMachine {
  coffeeBeans = 1000;
  water = 1000;
  milkTemperature = 30;
  desiredMilkTemperature = 75;

  @grindCoffeeBeans(20)
  @extractEspresso(50)
  espresso() {
    console.log("에스프레소가 나왔습니다.");
  }

  @grindCoffeeBeans(20)
  @extractEspresso(30)
  ristretto() {
    console.log("리스트레토가 나왔습니다.");
  }

  @grindCoffeeBeans(20)
  @extractEspresso(50)
  @heatMilk(140)
  caffelatte() {
    console.log(`Starbucks 카페라떼를 만듭니다...`);
    console.log(`Starbucks 카페라떼가 나왔습니다.`);
  }
}

class EdiyaMachine extends VarietyMachine {
  coffeeBeans = 1000;
  water = 1000;
  milkTemperature = 30;
  desiredMilkTemperature = 72;

  @grindCoffeeBeans(16)
  @extractEspresso(40)
  espresso() {
    console.log("에스프레소를 추출합니다.");
  }

  @grindCoffeeBeans(16)
  @extractEspresso(40)
  @heatMilk(120)
  caffelatte() {
    console.log(`Ediya 카페라떼를 만듭니다...`);
    console.log(`Ediya 카페라떼가 나왔습니다.`);
  }

  @grindCoffeeBeans(16)
  @extractEspresso(40)
  @heatMilk(80)
  cappuccino() {
    console.log(`Ediya 카푸치노를 만듭니다...`);
    console.log(`Ediya 카푸치노가 나왔습니다.`);
  }
}

const ediyaMachine = new EdiyaMachine();
const starbucksMachine = new StarbucksMachine();
starbucksMachine.caffelatte();
ediyaMachine.caffelatte();
ediyaMachine.cappuccino();
