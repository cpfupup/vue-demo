//元素节点操作
export const nodeOps = {
  //createElement, 不同的平台创建元素方式不同

  createElement: tagName => document.createElement(tagName),
  remove: child => {
    const parent = child.parentNode
    if (parent) {
      parent.removeChild(child)
    }
  },
  insert: (child, parent, anchor = null) => { //插入谁 插到哪 参照物是谁
    parent.insertBefore(child, anchor)//如果 anchor为空 相当于appendChild
  },
  querySelector: selector => document.querySelector(selector),
  setElementText: (el, text) => el.textContent = text,
  // 文本操作 创建文本
  createText: text => document.createTextNode(text),
  setText: (node, text) => node.nodeValue = text
}