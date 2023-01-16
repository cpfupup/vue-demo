import { isObject } from "@vue/shared"

// 实现响应式
const mutableHandlers = {}
const shallowReactiveHandlers = {}
const readonlyHanlers = {}
const shallowReadonlyHandlers = {}


export function reactive(target) {//响应式
  return createReactiveObjet(target, false, mutableHandlers)
}
export function shallowReative(target) {//浅响应式
  return createReactiveObjet(target, false, shallowReactiveHandlers)
}

export function readonly(target) {//只读
  return createReactiveObjet(target, true, readonlyHanlers)
}

export function shallowReadonly(target) {//浅只读
  return createReactiveObjet(target, true, shallowReadonlyHandlers)
}


// 柯里化处理共用部分 new Proxy() 最核心的需要拦截数据的读取和数据的修改 get set
const reactiveMap = new WeakMap();//会自动垃圾回收，不会造成内存泄漏，存储的key只能是对象
const readonlyMap = new WeakMap()
export function createReactiveObjet(target, isReadonly, baseHandlers) {
  // 如果目标不是对象 无法拦截， reactive这个api只能拦截对象类型
  if (!isObject(target)) {
    return target//如果不是对象直接返回
  }

  // 如果某个对象已经被代理过了，就不需要再次代理 可能一个对象 被代理是深度 又被仅读代理了
  const proxyMap = isReadonly ? readonlyMap : reactiveMap//如果是只读就由只读来代理

  //判断是否被代理过 如果代理过直接返回
  const exisitProxy = proxyMap.get(target)
  if (exisitProxy) {
    return exisitProxy
  }

  const proxy = new Proxy(target, baseHandlers);
  proxyMap.set(target, proxy);//将要代理的对象和对应代理结果缓存起来
  return proxy
}