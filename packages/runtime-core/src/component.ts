import { isFunction, isObject } from "@vue/shared";
import { shapeFlags } from "packages/shared/src/shapeFlag";
import { PublicInstanceProxyHandlers } from "./componentPublicInstanceProxyHandlers";

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
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers as any)//创造一个公共实例的代理函数
  //获取组件的类型 拿到组件的setup方法
  let Component = instance.type;
  let { setup } = Component;
  //没有setup 没有render
  if (setup) {
    let setupConText = createSetupContext(instance)
    const setupResult = setup(instance.props, setupConText)//instance中props attrs slots emit expose会被提取出来，因为在开发过程中会使用这些属性
    handleSetupResult(instance, setupResult)
  } else {
    finishComponentSetup(instance)//完成组件的启动
  }
}
function handleSetupResult(instance, setupResult) {
  if (isFunction(setupResult)) {
    instance.render = setupResult
  } else if (isObject(setupResult)) {
    instance.setupState = setupResult
  }
  finishComponentSetup(instance)
}
function finishComponentSetup(instance) {
  let Component = instance.type
  // let { render } = Component
  if (!instance.render) {
    //对template模版进行编译 产生render函数
    // instance.render = render //需要将生成render函数放在实例上 
    if (!Component.render && Component.template) {
      //编译 将结果赋予给Component.render
    }
    instance.render = Component.render
  }
  //对vue2.0API做了兼容 
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

//instance 表示组件的状态 各种各样的状态 组件的相关信息
//context就四个参数 是为了开发时使用的
//proxy主要是为了取值方便 =》proxy.xxx