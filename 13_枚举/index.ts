// 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
// 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}

console.log(Days['Sun'] === 0) // true
console.log(Days['Mon'] === 1) // true
console.log(Days['Tue'] === 2) // true
console.log(Days['Sat'] === 6) // true

console.log(Days[0] === 'Sun') // true
console.log(Days[1] === 'Mon') // true
console.log(Days[2] === 'Tue') // true
console.log(Days[6] === 'Sat') // true

// 上面例子会被编译成
var Days2 // 跟上面名称冲突，修改为Days2
;(function(Days2) {
  Days2[(Days2['Sun'] = 0)] = 'Sun'
  Days2[(Days2['Mon'] = 1)] = 'Mon'
  Days2[(Days2['Tue'] = 2)] = 'Tue'
  Days2[(Days2['Wed'] = 3)] = 'Wed'
  Days2[(Days2['Thu'] = 4)] = 'Thu'
  Days2[(Days2['Fri'] = 5)] = 'Fri'
  Days2[(Days2['Sat'] = 6)] = 'Sat'
})(Days2 || (Days2 = {}))

// 手动赋值

enum Days3 {
  Sun = 7,
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}

console.log(Days3['Sun'] === 7) // true
console.log(Days3['Mon'] === 1) // true
// 未手动赋值的枚举项会接着上一个枚举项递增
console.log(Days3['Tue'] === 2) // true
console.log(Days3['Sat'] === 6) // true

// 如果未手动赋值的枚举项与手动赋值的重复了，会覆盖手动赋值
enum Days4 {
  Sun = 3,
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}

console.log(Days4['Sun'] === 3) // true
console.log(Days4['Wed'] === 3) // true

// Days4[3]被覆盖为'Web'
console.log(Days4[3] === 'Sun') // false
console.log(Days4[3] === 'Wed') // true

// 上面编译如下
var Days5
;(function(Days5) {
  Days5[(Days5['Sun'] = 3)] = 'Sun'
  Days5[(Days5['Mon'] = 1)] = 'Mon'
  Days5[(Days5['Tue'] = 2)] = 'Tue'
  Days5[(Days5['Wed'] = 3)] = 'Wed' // 被重写成'Web'了
  Days5[(Days5['Thu'] = 4)] = 'Thu'
  Days5[(Days5['Fri'] = 5)] = 'Fri'
  Days5[(Days5['Sat'] = 6)] = 'Sat'
})(Days5 || (Days5 = {}))

// 枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。
// 计算所得项后必须都是计算所得项
enum Color {
  Red,
  Green,
  Blue = 'blue'.length // 为计算所得项
}

enum Color2 {
  Red = 'red'.length, // Green,Blue必须为计算所得项
  Green,
  Blue
}

// 常数枚举
// 常数枚举是使用 const enum 定义的枚举类型

const enum Directions {
  Up,
  Down,
  Left,
  Right
}

let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right
]

// 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员
// 编译后
var directions2 = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */]

// 外部枚举 常出现在声明文件中
// 外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类型
declare enum Directions3 {
  Up,
  Down,
  Left,
  Right
}

let directions3 = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right
]
// declare 定义的类型只会用于编译时的检查，编译结果中会被删除
// 上例的编译结果是：

var directions4 = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right
]

// 同时使用 declare 和 const 也是可以的
declare const enum Directions5 {
  Up,
  Down,
  Left,
  Right
}

let directions6 = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right
]

// 编译结果：

var directions5 = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */]
