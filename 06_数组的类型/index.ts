// 格式1：类型[]
let list: number[] = [1, 2, 3] // number[]声明此数组只能存放number类型，不能存放其他类型
// 使用any表示数组中允许出现任意类型
let listAny: any[] = ['Xcat Liu', 25, { website: 'http://xcatliu.com' }]

// 格式2：Array<elemType> 数组泛型
let list2: Array<number> = [4, 5, 6]

// 格式3：使用接口表示数组
interface NumberArray {
  [index: number]: number // 索引和值都必须是number类型
}

let list3: NumberArray = [1, 2, 3, 4]

// 类数组
function sum() {
  let args: IArguments[] = arguments // 使用ts内置的IArguments类数组接口表示类数组
}
