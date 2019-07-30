// 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。可理解为一个类型占位符(表示类型的变量)
// createArray，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值
function createArray(length: number, value: any): Array<any> {
  let result = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

createArray(3, 'x') // ['x', 'x', 'x']
// Array<any> 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 value 的类型

function createArray2<T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

createArray2<string>(3, 'x') //指定具体的类型为string ['x', 'x', 'x']

// 让类型推论自动推算出T的类型
function createArray4<T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
createArray4(3, 'x') //value是string，所以value的T的类型是string,所以整个定义中的T都是string, ['x', 'x', 'x']

// 定义泛型的时候，可以一次定义多个类型参数：
function swap<T, U>(tuple: [T, U]): [U, T] {
  //
  return [tuple[1], tuple[0]]
}

swap([7, 'seven']) //tuple是一个数组，第一个元素的类型是number,所以T为number类型；第二个元素为string,所以U为string， ['seven', 7]

// 泛型约束
// 在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length) // index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
  return arg
}
// 这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 length 属性的变量
interface Lengthwise {
  length: number
}

function loggingIdentity2<T extends Lengthwise>(arg: T): T {
  // T extends Lengthwise,此泛型继承子接口Lengthwise，必须实现length
  console.log(arg.length)
  return arg
}
loggingIdentity2(7) // index.ts(10,17): error TS2345: Argument of type '7' is not assignable to parameter of type 'Lengthwise'.不符合接口Lengthwise的形状

// 多个类型参数之间也可以互相约束
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = (<T>source)[id]
  }
  return target
}

let x = { a: 1, b: 2, c: 3, d: 4 }

copyFields(x, { b: 10, d: 20 })

// 可以使用含有泛型的接口来定义函数的形状
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>
}

let createArray3: CreateArrayFunc
createArray3 = function<T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

createArray3(3, 'x') // ['x', 'x', 'x']

// 可以把泛型参数提前到接口名上
interface CreateArrayFunc2<T> {
  (length: number, value: T): Array<T>
}

let createArray5: CreateArrayFunc2<any>
createArray5 = function<T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

createArray4(3, 'x') // ['x', 'x', 'x']

// 泛型也可以用于类的类型定义中
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) {
  return x + y
}

// 泛型参数的默认类型
// 当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用
function createArray6<T = string>(length: number, value: T): Array<T> {
  // T默认为string
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
