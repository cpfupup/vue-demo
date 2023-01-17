// 响应式逻辑
// 是否为仅读， 仅读属性set时会异常
// 是否为深度

import { extend, isObject } from "@vue/shared"
import { reactive, readonly } from "./reactive"

const get = createGetter()
const shallowGet = createGetter(false, true)
const readonlyGet = createGetter(true)
const shallowrReadonlyget = createGetter(true, true)
const set = createSetter();
const shallowSet = createSetter(true)

// 可写属性，需要考虑set是否为浅修改
export const mutableHandlers = {
  get: get,
  set
}

export const shallowReactiveHandlers = {
  get: shallowGet,
  shallowSet
}

// 抽离只读属性的set
let readonlyObj = {
  set: (target, key) => {
    console.warn(`set ${target}on key ${key}failed`);
  }
}
// 抽离出get函数 判断是否为仅读 是否为浅读
function createGetter(isReadonly = false, shallow = false) {// 拦截获取功能
  return function get(target, key, receiver) {//目标 key 代理对象本身 let proxy = reactive()
    //proxy + reflect
    //后续Object上的方法，会被迁移到Reflect Reflect.getProptyoeof()
    //以前target[key] = value 方式设置可能会失败，不会报异常，也没有返回值标识
    //Reflect 方法具备返回值
    //Reflect使用可以不使用proxy es6语法
    const res = Reflect.get(target, key, receiver)//反射 把从proxy取的值变为取target的值 相当于target[key]

    if (!isReadonly) {
      //收集依赖，数据变化后更新对应的视图
    }
    if (shallow) {
      return res
    }
    if (isObject(res)) {//如果是object就要考虑是否需要递归 vue2是一上来就递归，vue3是取值时会进行代理。vue3代理模式是懒代理
      return isReadonly ? readonly(res) : reactive(res)
    }
    return res;
  }
}

function createSetter(shallow = false) {// 拦截设置功能
  return function set(target, key, value, receiver) {//目标 key 要设置的值 代理对象本身 
    const result = Reflect.set(target, key, value, receiver);
    return result
  }
}

// 只读属性 不需要考虑set问题
export const readonlyHanlers = extend({
  get: readonlyGet,
}, readonlyObj)

export const shallowReadonlyHandlers = extend({
  get: shallowrReadonlyget
}, readonlyObj)
