// 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象，能表示包含不同类型数据的数组

let t1: [string, number] = ['Xcat Liu', 25]

// 当赋值或访问一个已知索引的元素时，会得到正确的类型
let t2: [string, number]
t2[0] = 'Xcat Liu'
t2[1] = 25

t2[0].slice(1)
t2[1].toFixed(2)

// 可以只赋值其中一项
let t3: [string, number]
t3[0] = 'cgh'

// 但是当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项
let t4: [string, number]
t4 = ['cgh'] // 报错，未提供全部项

let xcatliu: [string, number]
xcatliu = ['Xcat Liu'] // 报错，未提供全部项
xcatliu[1] = 25

// 越界元素，当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型
let t5: [string, number]
t5 = ['Xcat Liu', 25]
t5.push('http://t5.com/')
t5.push(true) // 不是string|number
