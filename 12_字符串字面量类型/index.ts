// 字符串字面量类型用来约束取值只能是某几个字符串中的一个
type EventNames = 'click' | 'scroll' | 'mousemove' // 定义了一个字面量类型，其值只能是三种字符串的一种
function handleEvent(ele: Element, event: EventNames) {
  // do something
}

handleEvent(document.getElementById('hello'), 'scroll') // 没问题
handleEvent(document.getElementById('world'), 'dbclick') // 报错，event 不能为 'dbclick'
