// 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。
// 在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implements）。

// TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。

// 声明一个接口，必须包含字符串的name、数字的age
interface Person {
  name: string
  age: number
}

let tom: Person = {
  name: 'Tom',
  age: 25
}

// 赋值的时候，变量的形状必须和接口的形状保持一致
// 多或者少属性都不行

interface Person2 {
  name: string
  age: number
}

let cgh: Person2 = {
  // 编译报错，缺少age
  name: 'cgh'
}

let cgh2: Person2 = {
  name: 'cgh',
  age: 20,
  sex: 'boy' // 编译报错，多一个属性
}

// 使用?表示接口的可选属性
interface Person3 {
  name: string
  age?: number // age属性可有可无，有必须是number类型
}

let p3: Person3 = {
  name: 'cgh'
}
let p4: Person3 = {
  name: 'cgh',
  age: 10
}
let p5: Person3 = {
  name: 'cgh',
  age: 10,
  sex: 'boy' // 编译报错，多余属性
}

// 任意属性
// 注意的是，一旦定义了任意属性，那么 确定属性 和 可选属性 都必须是它的子属性
interface Person4 {
  name: string
  age?: number
  [propName: string]: any
}

let p6: Person4 = {
  name: 'Tom',
  // 任意属性
  gender: 'male'
}

interface Person5 {
  name: string
  age?: number
  [propName: string]: string // 定义了任意属性都是string类型，可选属性是number类型，所以编译报错
}

let p7: Person5 = {
  name: 'Tom',
  age: 25,
  gender: 'male'
}

// 只读属性

interface Person6 {
  readonly id: number
  name: string
  age?: number
  [propName: string]: any
}

let p8: Person6 = {
  id: 89757,
  name: 'Tom',
  gender: 'male'
}

tom.id = 9527 // 只读无法修改

// 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
interface Person7 {
  readonly id: number
  name: string
  age?: number
  [propName: string]: any
}

let p9: Person7 = {
  // 对象已经赋值，默认所有属性已经被定义，所以下面的id默认已经被赋值，所以修改时编译报错
  name: 'Tom',
  gender: 'male'
}

p9.id = 89757
