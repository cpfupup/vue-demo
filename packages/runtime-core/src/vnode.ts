//createVNode 创建虚拟节点

import { isArray, isObject, isString } from "@vue/shared";
import { shapeFlags } from "packages/shared/src/shapeFlag";

//h('div',{style:{cokor:red}},'children') //h方法和createApp类似 h就是createVNode
export const createVNode = (type, props, children = null) => {//type 可以是个'div'字符串 也可以是一个对象
  //可以根据type来区分是组件还是普通的元素
  //给虚拟节点一个类型
  const shapeFlag = isString(type) ?
    shapeFlags.ELEMENT : isObject(type) ?
      shapeFlags.STATEFUL_COMPONENT : 0
  const vnode = { //一个对象来描述对应的内容，虚拟节点有跨平台的能力   
    __v_isVnode: true, //他是一个vnode节点
    type,
    props,
    children,
    component: null,//存放组件对应的实例
    el: null,//将虚拟节点和真实节点对应起来
    key: props && props.key, //如果拥有key就用key来做diff算法
    shapeFlag//判断出当前自己的类型和儿子的类型
  }
  noremallizeChildren(vnode, children)
  return vnode;
}
function noremallizeChildren(vnode, children) {
  let type = 0;
  if (children == null) {
    //不对儿子进行处理
  } else if (isArray(children)) {
    type = shapeFlags.ARRAY_CHILDREN
  } else {
    type = shapeFlags.TEXT_CHILDREN
  }
  vnode.shapeFlag = vnode.shapeFlag | type
}