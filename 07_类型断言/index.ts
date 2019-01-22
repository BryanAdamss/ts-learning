// 类型断言（Type Assertion）可以用来手动指定一个值的类型
// 断言可理解为假设
// 语法
// <类型>值
// 值 as 类型 tsx中必须使用此语法

// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
function getLength(something: string | number): number {
  return something.length // 会报错，因为number类型没有length属性
}

function getLength2(something: string | number): number {
  // 假设something为string类型，所以编译不会报错
  if ((<string>something).length) {
    return (<string>something).length
  } else {
    return something.toString().length
  }
}

// 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的：
function toBoolean(something: string | number): boolean {
  return <boolean>something
}
