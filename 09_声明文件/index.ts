// 当使用第三方库时，我们需要引用它的声明文件。
declare var jQuery: (selector: string) => any // 声明jquery需要一个string类型的输入，它将返回任意类型的返回值

jQuery('#foo')

// 通常我们会把类型声明放到一个单独的文件中，然后使用三斜线来引用

/// <reference path="./jQuery.d.ts" />

jQuery('#foo')

// 一般来说，ts 会解析项目中所有的 *.ts 文件，当然也包含以 .d.ts 结尾的文件。所以当我们将 jQuery.d.ts 放到项目中时，其他所有 *.ts 文件就都可以获得 jQuery 的类型定义了。

// 假如仍然无法解析，那么可以检查下 tsconfig.json 中的 files、include 和 exclude 配置，确保其包含了 jQuery.d.ts 文件。
// /path/to/project
// ├── src
// |  ├── index.ts
// |  └── jQuery.d.ts
// └── tsconfig.json

// ---------------------------------------------------------------
// 常用声明语法
// ---------------------------------------------------------------
// declare var 声明全局变量
// declare function 声明全局方法
// declare class 声明全局类
// declare enum 声明全局枚举类型
// declare namespace 声明（含有子属性的）全局对象
// interface 和 type 声明全局类型
// export 导出变量
// export namespace 导出（含有子属性的）对象
// export default ES6 默认导出
// export = commonjs 导出模块
// export as namespace UMD 库声明全局变量
// declare global 扩展全局变量
// declare module 扩展模块
// /// <reference /> 三斜线指令

// ---------------------------------------------------------------
// 书写声明文件
// ---------------------------------------------------------------
// 当一个第三方库没有提供声明文件时，我们就需要自己书写声明文件了
// 一般第三方库的使用场景主要有下面几种
// 全局变量：通过 <script> 标签引入第三方库，注入全局变量
// npm 包：通过 import foo from 'foo' 导入，符合 ES6 模块规范
// UMD 库：既可以通过 <script> 标签引入，又可以通过 import 导入
// 直接扩展全局变量：通过 <script> 标签引入后，改变一个全局变量的结构
// 在 npm 包或 UMD 库中扩展全局变量：引用 npm 包或 UMD 库后，改变一个全局变量的结构
// 模块插件：通过 <script> 或 import 导入后，改变另一个模块的结构

// ---------------------------------------------------------------
// 书写声明文件 - 全局变量
// ---------------------------------------------------------------

// declare var或declare let或declare const
declare const jQuery2: (selector: string) => any // jQuery2是一个接收string入参，返回any的函数
jQuery2('#foo')
// 使用 declare const 定义的 jQuery 类型，禁止修改这个全局变量
jQuery2 = function(selector) {
  return document.querySelector(selector)
}

// 声明语句中只能定义类型，切勿在声明语句中定义具体的实现
declare const jQuery3 = function(selector) {
  return document.querySelector(selector)
}

// declare function
declare function jQuery4(selector: string): any // jQuery本身是一个函数，也可以用declare function 来定义
jQuery4('#foo')

// declare class
// 当全局变量是一个类的时候，我们用 declare class 来定义它的类型
declare class Animal {
  name: string
  constructor(name: string)
  sayHi(): string
}
let cat = new Animal('Tom')

// declare enum
// 使用 declare enum 定义的枚举类型也称作外部枚举（Ambient Enums）
declare enum Directions {
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

// declare namespace
// 历史原因，现在的namespace等同于ts之前的`内部模块`
// declare namespace 用来表示全局变量是一个对象，包含很多子属性
declare namespace jQuery5 {
  // 注意，在 declare namespace 内部，我们直接使用 function ajax 来声明函数，而不是使用 declare function ajax。类似的，也可以使用 const, class, enum 等语句
  function ajax(url: string, settings?: any): void
  const version: number
  class Event {
    blur(eventType: EventType): void
  }
  enum EventType {
    CustomClick
  }
}

jQuery5.ajax('/api/get_something')

// 嵌套的 namespace
declare namespace jQuery6 {
  function ajax(url: string, settings?: any): void
  namespace fn {
    function extend(object: any): void
  }
}
jQuery6.ajax('/api/get_something')
jQuery6.fn.extend({
  check: function() {
    return this.each(function() {
      this.checked = true
    })
  }
})

// 假如 jQuery 下仅有 fn 这一个属性（没有 ajax 等其他属性或方法），则可以不需要嵌套 namespace
declare namespace jQuery7.fn {
  function extend(object: any): void
}

jQuery7.fn.extend({
  check: function() {
    return this.each(function() {
      this.checked = true
    })
  }
})

// 全局interface、type
// 在类型声明文件中，我们可以直接使用 interface 或 type 来声明一个全局的接口或类型、这样的话，在其他文件中也可以使用这个接口或类型了
// src/jQuery.d.ts
interface AjaxSettings {
  method?: 'GET' | 'POST'
  data?: any
}
declare namespace jQuery8 {
  function ajax(url: string, settings?: AjaxSettings): void
}

// src/index.ts
let settings: AjaxSettings = {
  method: 'POST',
  data: {
    name: 'foo'
  }
}
jQuery8.ajax('/api/post_something', settings)
// 暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 namespace 下
// src/jQuery.d.ts
declare namespace jQuery9 {
  interface AjaxSettings {
    method?: 'GET' | 'POST'
    data?: any
  }
  function ajax(url: string, settings?: AjaxSettings): void
}

// src/index.ts
let settings2: jQuery9.AjaxSettings = {
  method: 'POST',
  data: {
    name: 'foo'
  }
}
jQuery9.ajax('/api/post_something', settings2)

// 声明合并
// 假如 jQuery 既是一个函数，可以直接被调用 jQuery('#foo')，又是一个对象，拥有子属性 jQuery.ajax()（事实确实如此），那么我们可以组合多个声明语句，它们会不冲突的合并起来

// src/jQuery.d.ts
declare function jQuery10(selector: string): any
declare namespace jQuery10 {
  function ajax(url: string, settings?: any): void
}
// src/index.ts
jQuery10('#foo')
jQuery10.ajax('/api/get_something')

// ---------------------------------------------------------------
// 书写声明文件 - npm包
// ---------------------------------------------------------------

// npm包的声明文件一般会存在两个地方
// 1.与npm包捆绑在一起；查看package.json中是否存在types字段或者是否存在index.d.ts声明文件
// 2.发布到@types里；作者没提供声明文件，只能由其他人编写好，然后发布到@types下供他人使用

// 如果上述两种都没有，则需要自己编写；自己编写的声明文件存放位置有两种
// 1.存放到node_modules中，新建@types目录然后添加对应包的声明文件；完整目录大概长这样：node_modules/@types/foo/index.d.ts；不建议，无法回溯版本，一般只做临时测试用
// 2.项目中新建types目录，专门管理自定义声明文件；参考目录：types/foo/index.d.ts；这种方式需要配置下 tsconfig.json 中的 paths 和 baseUrl 字段

// export
// 在 npm 包的声明文件中，使用 declare 不再会声明一个全局变量，而只会在当前文件中声明一个局部变量。只有在声明文件中使用 export 导出，然后在使用方 import 导入后，才会应用到这些类型声明

// types/foo/index.d.ts
export const name2: string
export function getName(): string
export class Animal2 {
  constructor(name: string)
  sayHi(): string
}
export enum Directions2 {
  Up,
  Down,
  Left,
  Right
}
export interface Options {
  data: any
}

// src/index.ts
import { name2, getName, Animal, Directions2, Options } from 'foo'

console.log(name2)
let myName = getName()
let cat2 = new Animal('Tom')
let directions2 = [
  Directions2.Up,
  Directions2.Down,
  Directions2.Left,
  Directions2.Right
]
let options: Options = {
  data: {
    name: 'foo'
  }
}

// 混用 declare 和 export
// 可以使用 declare 先声明多个变量，最后再用 export 一次性导出

// types/foo/index.d.ts
declare const name3: string
declare function getName3(): string
declare class Animal3 {
  constructor(name: string)
  sayHi(): string
}
declare enum Directions3 {
  Up,
  Down,
  Left,
  Right
}

// interface 前是不需要 declare
interface Options2 {
  data: any
}

export { name3, getName3, Animal3, Directions3, Options2 }

// export namespace
// export namespace 用来导出一个拥有子属性的对象

// types/foo/index.d.ts
export namespace foo2 {
  const name: string
  namespace bar {
    function baz(): string
  }
}

// src/index.ts
import { foo2 } from 'foo2'
console.log(foo2.name)
foo2.bar.baz()

// export default
// 导出默认值，default导出一般放在声明文件头部
export default function foo3(): string
// 只有 function、class 和 interface 可以直接默认导出，其他的变量需要先定义出来，再默认导出

// export =
// 适用于commonjs 规范
// 整体导出
module.exports = foo
// 单个导出
exports.bar = bar

// ---------------------------------------------------------------
// 书写声明文件 - UMD
// ---------------------------------------------------------------
// 全局变量  + es6module形式

// export as namespace 来支持UMD
// 有了 npm 包的声明文件，再基于它添加一条 export as namespace 语句，即可将声明好的一个变量声明为全局变量

// types/foo/index.d.ts

export as namespace foo
export = foo

declare function foo(): string
declare namespace foo {
  const bar: number
}

// ---------------------------------------------------------------
// 书写声明文件 - 直接扩展全局变量(修改prototype)
// ---------------------------------------------------------------

interface String {
  prependHello(): string
}

'foo'.prependHello()

// ---------------------------------------------------------------
// 书写声明文件 - 在 npm 包或 UMD 库中扩展全局变量
// ---------------------------------------------------------------
// declare global 可以在 npm 包或者 UMD 库的声明文件中扩展全局变量的类型
// types/foo/index.d.ts

declare global {
  interface String {
    prependHello(): string
  }
}
// 注意即使此声明文件不需要导出任何东西，仍然需要导出一个空对象，用来告诉编译器这是一个模块的声明文件，而不是一个全局变量的声明文件
export {}

// ---------------------------------------------------------------
// 书写声明文件 - 模块插件
// ---------------------------------------------------------------
// 有时通过 import 导入一个模块插件，可以改变另一个原有模块的结构。此时如果原有模块已经有了类型声明文件，而插件模块没有类型声明文件，就会导致类型不完整，缺少插件部分的类型。ts 提供了一个语法 declare module，它可以用来扩展原有模块的类型

// declare module
// 如果是需要扩展原有模块的话，需要在类型声明文件中先引用原有模块，再使用 declare module 扩展原有模块
// types/moment-plugin/index.d.ts

import * as moment from 'moment'

declare module 'moment' {
  export function foo(): moment.CalendarKey
}

// declare module 也可用于在一个文件中一次性声明多个模块的类型
declare module 'foo' {
  export interface Foo {
    foo: string
  }
}

declare module 'bar' {
  export function bar(): string
}

// ---------------------------------------------------------------
// 声明文件中的依赖
// ---------------------------------------------------------------
// 方式1：使用import导入依赖声明文件
import * as moment from 'moment'

declare module 'moment' {
  export function foo(): moment.CalendarKey
}

// 方式2：使用///
// 当且仅当在以下几个场景下，我们才需要使用三斜线指令替代 import：
// 当我们在书写一个全局变量的声明文件时
// types/jquery-plugin/index.d.ts

/// <reference types="jquery" />
declare function foo(options: JQuery.AjaxSettings): string

// 当我们需要依赖一个全局变量的声明文件时
// types/node-plugin/index.d.ts

/// <reference types="node" />

export function foo(p: NodeJS.Process): string

// 三斜线指令必须放在文件的最顶端，三斜线指令的前面只允许出现单行或多行注释

// 拆分声明文件
// 声明文件过大时，可拆分成多个小声明文件
// node_modules/@types/jquery/index.d.ts

/// <reference types="sizzle" />
/// <reference path="JQueryStatic.d.ts" />
/// <reference path="JQuery.d.ts" />
/// <reference path="misc.d.ts" />
/// <reference path="legacy.d.ts" />

export = jQuery
// types 和 path 两种不同的指令。它们的区别是：types 用于声明对另一个库的依赖，而 path 用于声明对另一个文件的依赖

// ---------------------------------------------------------------
// 自动生成声明文件
// ---------------------------------------------------------------
// 如果库的源码本身就是由 ts 写的，那么在使用 tsc 脚本将 ts 编译为 js 的时候，添加 declaration 选项，就可以同时也生成 .d.ts 声明文件了
// {
//   "compilerOptions": {
//       "module": "commonjs",
//       "outDir": "lib",// 输出目录
//       "declaration": true, // 生成声明文件
//   }
// }

// ---------------------------------------------------------------
// 发布声明文件
// ---------------------------------------------------------------
// 1.将声明文件和源码放在一起
// 如果声明文件是通过 tsc 自动生成的，那么无需做任何其他配置，只需要把编译好的文件也发布到 npm 上，使用方就可以获取到类型提示了
// 如果是手动写的声明文件，那么需要满足以下条件之一，才能被正确的识别(查找声明文件顺序也是按此顺序进行的)：
// 给 package.json 中的 types 或 typings 字段指定一个类型声明文件地址
// 在项目根目录下，编写一个 index.d.ts 文件
// 针对入口文件（package.json 中的 main 字段指定的入口文件），编写一个同名不同后缀的 .d.ts 文件

// 2.将声明文件发布到 @types 下
// https://github.com/DefinitelyTyped/DefinitelyTyped/
