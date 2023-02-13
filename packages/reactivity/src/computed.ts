// 该方法默认不会被执行
// 当访问属性的时候执行

import { isFunction } from "@vue/shared";

// 具有缓存效果
export function computed(getterOrIptions) {
  let getter;
  let setter;
  if (isFunction(getterOrIptions)) {
    getter = getterOrIptions;
    setter = () => {
      console.warn('computed value must be readonly')
    }
  }
}