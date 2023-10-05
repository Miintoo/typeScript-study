class Car {
  #color;
  hasColor() {
    return #color in this;
  }
}
class House {
  #color;
  hasColor() {
    return #color in this;
  }
}
const car = new Car();
const house = new House();
console.log(car.hasColor()); // true;
console.log(car.hasColor.call(house)); // false
console.log(house.hasColor()); // true
console.log(house.hasColor.call(car)); // false
