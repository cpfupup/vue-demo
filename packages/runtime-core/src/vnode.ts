//createVNode 创建虚拟节点
//h('div',{style:{cokor:red}},'children') //h方法和createApp类似 h就是createVNode
export const createVNode = (type, props, children = null) => {//type 可以是个'div'字符串 也可以是一个对象
  //可以根据type来区分是组件还是普通的元素
  //给虚拟节点一个类型

  const vnode = { //一个对象来描述对应的内容，虚拟节点有跨平台的能力   
    __v_isVnode: true, //他是一个vnode节点
    type,
    props,
    children,
    el: null,//将虚拟节点和真实节点对应起来
    key: props && props.key //如果拥有key就用key来做diff算法
  }
  return vnode;
}