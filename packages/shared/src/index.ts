export const isObject = (value) => typeof value === 'object' && value !== null // 判断是否为对象且不为空
export const extend = Object.assign // Object.assign方法用于对象的合并，将源对象（ source ）的所有可枚举属性，复制到目标对象（ target ）
export const isArray = Array.isArray
export const isFunction = (value) => typeof value === 'function'
export const isNumber = (value) => typeof value === 'number'
export const isString = (value) => typeof value === 'string'