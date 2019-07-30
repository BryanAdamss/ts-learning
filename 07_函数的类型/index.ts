// ---------------------------------------------------------------
// 函数声明
// ---------------------------------------------------------------

// 输入多余的（或者少于要求的）参数，是不被允许的
function sum(x: number, y: number): number {
  return x + y
}
sum(1, 2, 3) // 参数多了

function sum2(x: number, y: number): number {
  return x + y
}
sum2(1) // 参数少了

// ---------------------------------------------------------------
// 函数表达式
// ---------------------------------------------------------------
// x y及返回值都是number类型的
let mySum = function(x: number, y: number): number {
  return x + y
}

// 上面的问题，mySum的类型是通过右侧的类型进行推论得出来的(只定义了右侧匿名函数的类型，左侧mySum没有进行类型定义)
// 下面为完整的定义
// 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型
let mySum2: (x: number, y: number) => number = function(
  x: number,
  y: number
): number {
  return x + y
}

// ---------------------------------------------------------------
// 用接口定义函数的形状
// ---------------------------------------------------------------
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc // 声明mySearch函数是SearchFunc类型的
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1
}

// ---------------------------------------------------------------
// 可选参数，用?表示
// ---------------------------------------------------------------

// 可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必须参数了
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName
  } else {
    return firstName
  }
}
let tomcat = buildName('Tom', 'Cat')
let tom = buildName('Tom')

// ---------------------------------------------------------------
// 参数默认值
// ---------------------------------------------------------------

// TypeScript 会将添加了默认值的参数识别为可选参数(默认值生效时，代表未传入值，所以当前参数就可以认为是一个是一个非必填参数即可选参数)
function buildName2(firstName: string, lastName: string = 'Cat') {
  return firstName + ' ' + lastName
}
let tomcat2 = buildName2('Tom', 'Cat')
let tom2 = buildName2('Tom')

// ---------------------------------------------------------------
// 重载
// ---------------------------------------------------------------

// 重载后，代码提示能正确提示相关类型(可在下面reverse调用时，传入不同参数类型，然后alt+click跳转对应定义，会发现其根据不同入参跳转不同类型定义)
// TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面
// 下面前两个为reverse定义，第三个为实现

function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(
      x
        .toString()
        .split('')
        .reverse()
        .join('')
    )
  } else if (typeof x === 'string') {
    return x
      .split('')
      .reverse()
      .join('')
  }
}

reverse('123')
