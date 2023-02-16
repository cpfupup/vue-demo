//属性操作 

import { patchAttr } from "./modules/attr";
import { patchClass } from "./modules/class";
import { patchEvent } from "./modules/events";
import { patchStyle } from "./modules/style";

export const pathProp = (el, key, prevValue, nextValue) => {
  switch (key) {
    case 'class':
      patchClass(el, nextValue) //比对属性
      break;
    case 'style':
      patchStyle(el, prevValue, nextValue)
    default:
      //如果不是事件 才是属性
      if (/^on[^a-z]/.test(key)) {
        patchEvent(el, key, nextValue)//事件就是添加删除修改
      } else {
        patchAttr(el, key, nextValue)
      }
      break;
  }
}