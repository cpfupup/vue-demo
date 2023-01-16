// 响应式逻辑
// 是否为仅读， 仅读属性set时会异常
// 是否为深度

import { extend } from "@vue/shared"

// 抽离出get函数 判断是否为仅读 是否为浅读
function createGetter(isReadonly = false, shallow = false) {

}

function createSetter(isReadonly = false) {

}

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
// 只读属性 不需要考虑set问题
export const readonlyHanlers = extend({
  get: readonlyGet,
}, readonlyObj)

export const shallowReadonlyHandlers = extend({
  get: shallowrReadonlyget
}, readonlyObj)
