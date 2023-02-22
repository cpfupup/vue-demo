import { effect } from "@vue/reactivity";
import { shapeFlags } from "packages/shared/src/shapeFlag";
import { createAppAPI } from "./apiCreateApp"
import { createComponentInstance, setupComponent } from "./component";

export function createRenderer(rendererOptions) { //告诉core 怎么渲染
  const setupRunderEfect = (instance) => {
    // 需要创建一个effect  在effect中调用render方法 这样render方法中拿到的数据会收集effect，属性更新时effect重新执行

    effect(function componentEffect() { // 每个组件都有一个effect，vue3是组件级更新，数据变化会重新执行对应组件的effect
      if (!instance.isMounted) {
        let proxyToUse = instance.proxy
        instance.render.call(proxyToUse, proxyToUse)
        instance.isMounted = true;
      } else {
        //更新逻辑
      }
    })
  }
  const mountComponent = (initialVNode, container) => { //初始化节点的方法
    //组件的渲染流程 最核心的就是调用 setup拿到返回值 获得render函数返回的结果来进行渲染

    //1.先有实例
    const instance = initialVNode.component = createComponentInstance(initialVNode) //通过createComponent来创建实例挂载到initialVNode.component上

    // 2.需要的数据解析到实例上
    setupComponent(instance)
    // 3.创建一个effect 让render函数执行

    setupRunderEfect(instance)
  }
  const processComponent = (n1, n2, container) => {
    if (n1 == null) { //组件没有上一次的虚拟节点 进行初始化
      mountComponent(n2, container)
    } else { //组件更新

    }
  }
  const patch = (n1, n2, container) => { //老的虚拟节点 新的虚拟节点 容器
    //针对不同类型 做初始化操作
    const { shapeFlag } = n2;
    if (shapeFlag & shapeFlags.ELEMENT) {//元素

    } else if (shapeFlag & shapeFlags.STATEFUL_COMPONENT) { //组件
      processComponent(n1, n2, container)
    }
  }

  const render = (vnode, container) => {
    //core的核心 根据不同的虚拟节点，创建对应的真实元素

    //默认 调用render 可能是初始化流程
    patch(null, vnode, container) //初始化或者更新都需要调用patch

  }
  return {
    createApp: createAppAPI(render)
  }
}

//creatRenderer 目的是创建一个渲染器
//框架 都是将组件转化为虚拟dom -》虚拟dom生成真实dom挂载到页面上