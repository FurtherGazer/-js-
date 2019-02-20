// 定义一个对象
function Car(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;
}

// 创建一个实例
// 创建实例的最大特点在于：
//  —— 继承了原来对象的属性 prototype
//  —— 将 this 绑定到新对象
var myCar = new Car('Eaggle', 'Talon Tsi', 1993)