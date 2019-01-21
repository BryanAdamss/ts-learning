// TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论
let myFavoriteNumber = 'seven' // 此时myFavoriteNumber已经被推断为string类型了
myFavoriteNumber = 7

// 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查
let myFavoriteNumber2
myFavoriteNumber2 = 'seven'
myFavoriteNumber2 = 7
