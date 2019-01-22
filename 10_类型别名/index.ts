// 使用 type 创建类型别名，类型别名常用于联合类型
type Name = string // 声明Name类型为string类型
type NameResolver = () => string // 声明NameResolver为返回string的类型
type NameOrResolver = Name | NameResolver
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}
