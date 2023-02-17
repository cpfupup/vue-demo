import { createVNode } from "./vnode"

// container, rootComponent, rootProps, rendererOptions 渲染容器 组件 属性 方法
export function createAppAPI(render) {
  return function createApp(rootComponent, rootProps) { //告诉他哪个组件 哪个属性来创建的应用
    const app = {
      _props: rootProps,
      _component: rootComponent,
      _container: null, //应用对应的容器
      mount(container) {//挂载目的地
        // let vnode = {}
        // render(vnode, container);
        // 1.根据组件构建虚拟节点
        // 2.将虚拟节点和容器获取到后调用render方法进行渲染 、
        //虚拟节点
        const vnode = createVNode(rootComponent, rootProps)
        //render调用
        render(vnode,container)
        app._container = container
      }
    }
  }
}