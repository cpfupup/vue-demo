import { shapeFlags } from "packages/shared/src/shapeFlag";

//组件中所有的方法
export function createComponentInstance(vnode) {

  // webcomponent 组件需要有“属性” “插槽”
  const instance = {//组件的实例
    vnode,
    type: vnode.type,
    props: {},
    attrs: {},
    slots: {},
    ctx: {},
    setupState: {},//如果setup返回一个对象，这个对象会作为setUpstate
    isMounted: false//标识是否被挂载
  }
  instance.ctx = { _: instance }//instance.ctx._
  return instance
}
export function setupComponent(instance) {
  //instance.vnode
  const { props, children } = instance.vnode

  //根据props解析出props和attrs 将其放到instance上
  instance.props = props;// initProps()
  instance.children = children;//插槽的解析 initSlot()

  //需要先看下当前组件是不是有状态的组件，函数组件
  let isStateful = instance.vnode.shapeFlag | shapeFlags.STATEFUL_COMPONENT
  if (isStateful) {//表示现在是一个带状态的组件
    //调用 当前实例的setup方法，用setup的返回值填充setupState和对应的render方法
    setupStatefulComponent(instance)
  }
}
function setupStatefulComponent(instance) {
  //代理 传递给render函数的参数
  //获取组件的类型 拿到组件的setup方法
  let  Component  = instance.type;
  let { setup } = Component;
  let  setupConText = createSetupContext(instance)
  setup(instance.prpos,setupConText)//instance中props attrs slots emit expose会被提取出来，因为在开发过程中会使用这些属性
  Component.render()
}
function createSetupContext(instance) {
  return {
    attrs: instance.attrs,
    slots: instance.slots,
    props: instance.props,
    emit: () => { },
    expose: () => { }
  }
}