import { createAppAPI } from "./apiCreateApp"

export function createRenderer(rendererOptions) { //告诉core 怎么渲染
  const render = (vnode, container) => {
    //core的核心
  }
  return {
    createApp: createAppAPI(render)
  }
}

//creatRenderer 目的是创建一个渲染器
//框架 都是将组件转化为虚拟dom -》虚拟dom生成真实dom挂载到页面上