// ---------------------------------------------------------------
// 布尔
// ---------------------------------------------------------------
let isDone: boolean = true // 布尔型

// ---------------------------------------------------------------
// 数字
// ---------------------------------------------------------------
let decLiteral: number = 3 // 十进制
let hexLiteral: number = 0xf00d // 十六进制
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010 // 二进制
// ES6 中的八进制表示法
let octalLiteral: number = 0o744 // 八进制
let notANumber: number = NaN //NaN
let infinityNumber: number = Infinity // Infinity

// ---------------------------------------------------------------
// 字符串
// ---------------------------------------------------------------
let myName: string = 'Tom'
let myAge: number = 25
// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`

// ---------------------------------------------------------------
// 空值 - 使用void表示没有任何返回值
// ---------------------------------------------------------------
function alertName(): void {
  alert('My name is cgh!')
}

let unusable: void = undefined // unusable将只能被赋值为null或者undefined

// ---------------------------------------------------------------
// Null、Undefined
// ---------------------------------------------------------------

let u: undefined = undefined // u 只能被赋值为undefined
let n: null = null // n只能被赋值为null

//  与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：

// 这样不会报错
let num: number = undefined

// 这样也不会报错
let u1: undefined
let num1: number = u1

// 而 void 类型的变量不能赋值给 number 类型的变量
let u2: void
let num2: number = u2 // void类型将不能被赋值到其他类型上
