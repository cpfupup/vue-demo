// runtime-dom 核心就是提供domAPI方法，操作dom节点，操作属性的更新
// 节点操作 增删改查
// 属性操作 添加 删除 更新 样式 类 事件 其他属性
import { extend } from "@vue/shared";
import { nodeOps } from "./nodeOps";  //对象
import { pathProp } from "./pathProp"; //方法

// 渲染时用到的所有方法
const rendererOptions = extend({ pathProp }, nodeOps)

//用户调用的是runtime-dom -> runtime-core
//run time-dom 是为了解决平台差异 （浏览器端）

function createRenderer(rendererOptions) { //告诉core 怎么渲染
  return {
    createApp(rootComponent, rootProps) { //告诉他哪个组件 哪个属性来创建的应用
      const app = {
        mount(container) {
          console.log(container,rootComponent,rootProps,rendererOptions);//渲染容器 组件 属性 方法
        }
      }
      return app
    }
  }
}

//vue中的runtime-core提供了核心的方法 用来处理渲染 他会使用runtime-dom中的api进行渲染
export function createApp(rootComponent, rootProps = null) {
  const app: any = createRenderer(rendererOptions).createApp(rootComponent, rootProps)
  let { mount } = app
  //清空容器的操作
  app.mount = function (container) {
    container = nodeOps.querySelector(container)
    container.innerHTML = ''
    mount(container)
    //将组建渲染成dom元素进行挂载
  }
  return app
}