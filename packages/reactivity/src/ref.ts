// 原理 ref将普通的值(可以是对象，但是一般情况下是对象直接用reactive更合理)转换为一个对象，这个对象中有value属性 指向原来的值

import { haschanged, isArray, isObject } from "@vue/shared";
import { track, trigger } from "./effect";
import { TrackOptypes, TriggerOpTypes } from "./operators";
import { reactive } from "./reactive";

const convert = (val) => isObject(val) ? reactive(val) : val
//ref 和reactive的区别 reactive内部采用proxy ref中内部使用的是defineProperty
class RefImpl {
  public _value; //表示声明了 但是没赋值
  public __v_isRef = true;// 产生的实例会被添加__v_isRef表示是一个ref属性
  constructor(public rawValue, public shallow) { //参数中前面增加修饰符 标识此属性放到了实例上
    this._value = shallow ? rawValue : convert(rawValue)//如果是深度 需要把里面都变成响应式
  }
  get value() {
    track(this, TrackOptypes.GET, 'value');
    return this._value
  }
  set value(newValue) {
    if (haschanged(newValue, this.rawValue)) { //更新的时候需要注意新值和老值是否相同
      this.rawValue = newValue //新值会变为老值
      this._value = this.shallow ? newValue : convert(newValue)
    }
    trigger(this, TriggerOpTypes.SET, 'value', newValue)
  }
}

class ObjectRefImpl {
  public __v_isRef = true
  constructor(public target, public key) {

  }
  get value() {
    return this.target[this.key]
  }
  set value(newValue) {
    this.target[this.key] = newValue
  }
}

function createRef(rawValue, shallow = false) {
  return new RefImpl(rawValue, shallow)
}

export function ref(value) { // value 是一个普通类型
  // 将普通类型变成一个对象
  return createRef(value)
}

export function shallowRef(value) {
  return createRef(value, false)
}

//将某一个key对应的值，转换为ref
export function toRef(target, key) { // 把一个对象的值转化为ref类型
  return new ObjectRefImpl(target, key)
}

export function toRefs(object) { // object 传递的可能是数组或者对象

  const ret = isArray(object) ? new Array(object.length) : {}
  for (let key in object) {
    ret[key] = toRef(object, key)
  }
  return ret
}