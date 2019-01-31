// ES6中的类
class Animal {
  constructor(name) {
    this.name = name
  }
  sayHi() {
    return `My name is ${this.name}`
  }
}

let a = new Animal('Jack')
console.log(a.sayHi()) // My name is Jack

// 继承
class Cat extends Animal {
  constructor(name) {
    super(name) // 调用父类的 constructor(name)
    console.log(this.name)
  }
  sayHi() {
    return 'Meow, ' + super.sayHi() // 调用父类的 sayHi()
  }
}

let c = new Cat('Tom') // Tom
console.log(c.sayHi()) // Meow, My name is Tom

// 存取器
class Animal2 {
  constructor(name) {
    this.name = name
  }
  get name() {
    return 'Jack'
  }
  set name(value) {
    console.log('setter: ' + value)
  }
}

let a2 = new Animal2('Kitty') // setter: Kitty
a2.name = 'Tom' // setter: Tom
console.log(a2.name) // Jack

// 静态方法
// 使用 static 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用
class Animal3 {
  static isAnimal(a) {
    return a instanceof Animal3
  }
}

let a3 = new Animal3('Jack')
Animal3.isAnimal(a) // true
a.isAnimal3(a) // TypeError: a.isAnimal is not a function

// 实例属性
// ES6 中实例的属性只能通过构造函数中的 this.xxx 来定义，ES7 提案中可以直接在类里面定义
class Animal4 {
  name = 'Jack'

  constructor() {
    // ...
  }
}

let a4 = new Animal4()
console.log(a4.name) // Jack

// 静态属性
// ES7 提案中，可以使用 static 定义一个静态属性：
class Animal5 {
  static num = 42

  constructor() {
    // ...
  }
}

console.log(Animal5.num) // 42

// 访问修饰符
// TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected。

// public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
// private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
// protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

// public
class Animal6 {
  public name
  public constructor(name) {
    this.name = name
  }
}

let a6 = new Animal6('Jack')
console.log(a6.name) // Jack
a6.name = 'Tom'
console.log(a6.name) // Tom

// private
class Animal7 {
  private name
  public constructor(name) {
    this.name = name
  }
}

let a7 = new Animal7('Jack')
console.log(a7.name) // Jack
a7.name = 'Tom'

// index.ts(9,13): error TS2341: Property 'name' is private and only accessible within class 'Animal'.
// index.ts(10,1): error TS2341: Property 'name' is private and only accessible within class 'Animal'.

// protected
class Animal8 {
  protected name
  public constructor(name) {
    this.name = name
  }
}

class Cat8 extends Animal8 {
  constructor(name) {
    super(name)
    console.log(this.name)
  }
}

// 抽象类
// abstract 用于定义抽象类和其中的抽象方法。
// 抽象类是不允许被实例化的
// 抽象类中的抽象方法必须被子类实现
abstract class Animal9 {
  public name
  public constructor(name) {
    this.name = name
  }
  public abstract sayHi()
}

let a9 = new Animal9('Jack')

// index.ts(9,11): error TS2511: Cannot create an instance of the abstract class 'Animal'.

abstract class Animal10 {
  public name
  public constructor(name) {
    this.name = name
  }
  public abstract sayHi()
}

class Cat10 extends Animal10 {
  public eat() {
    console.log(`${this.name} is eating.`)
  }
}

let cat = new Cat('Tom')

// index.ts(9,7): error TS2515: Non-abstract class 'Cat' does not implement inherited abstract member 'sayHi' from class 'Animal'.

abstract class Animal11 {
  public name
  public constructor(name) {
    this.name = name
  }
  public abstract sayHi()
}

class Cat11 extends Animal11 {
  public sayHi() {
    console.log(`Meow, My name is ${this.name}`)
  }
}

let cat11 = new Cat11('Tom')

// 类的类型

class Animal12 {
  name: string
  constructor(name: string) {
    this.name = name
  }
  sayHi(): string {
    return `My name is ${this.name}`
  }
}

let a12: Animal12 = new Animal12('Jack')
console.log(a.sayHi()) // My name is Jack
