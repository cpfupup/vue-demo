// 原理 ref将普通的值(可以是对象，但是一般情况下是对象直接用reactive更合理)转换为一个对象，这个对象中有value属性 指向原来的值

import { createTypeReferenceDirectiveResolutionCache } from "typescript"

//ref 和reactive的区别 reactive内部采用proxy ref中内部使用的是defineProperty
export function ref(value) { // value 是一个普通类型
  // 将普通类型变成一个对象
  return createRef(value)
}

export function shallowRef(value) {
  return createRef(value, false)
}

class RefImpl {
  public _value; //表示声明了 但是没赋值
  public __v_isRef = true;// 产生的实例会被添加__v_isRef表示是一个ref属性
  constructor(public rawValue, public shallow) { //参数中前面增加修饰符 标识此属性放到了实例上

  }
}

function createRef(rawValue, shallow = false) {
  return new RefImpl(rawValue, shallow)
}