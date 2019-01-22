// 当使用第三方库时，我们需要引用它的声明文件。
declare var jQuery: (selector: string) => any // 声明jquery需要一个string类型的输入，它将返回任意类型的返回值

jQuery('#foo')

// 通常我们会把类型声明放到一个单独的文件中，然后使用三斜线来引用

/// <reference path="./jQuery.d.ts" />

jQuery('#foo')
