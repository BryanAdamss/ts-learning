// 联合类型（Union Types）表示取值可以为多种类型中的一种。
let myFavoriteNumber: string | number // 值可以为字符串也可以是数字
myFavoriteNumber = 'seven'
myFavoriteNumber = 7

// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
function getLength(something: string | number): number {
  return something.length // number类型没有length属性
}

function getString(something: string | number): string {
  return something.toString() // string、number类型都有toString方法
}

let myFavoriteNumber2: string | number
myFavoriteNumber2 = 'seven'
console.log(myFavoriteNumber2.length) // 5
myFavoriteNumber2 = 7
console.log(myFavoriteNumber2.length) // 编译时报错，myFavoriteNumber2被推断为字符串
