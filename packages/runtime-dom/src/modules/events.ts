export const patchEvent = (el, key, value) => { //vue指令 删除和添加
  //对函数的缓存 
  const invokers = el._vei || (el._vei = {})
  const exists = invokers[key]; // 如果不存在
  if (value && exists) { //需要绑定事件 而且还存在的情况下
    exists.value = value
  } else {
    const eventName = key.slice(2).toLoweCase()
    if (value) { //要绑定事件 以前没有绑过
      let invoker = invokers[key] = createInvoker(value)
      el.addEventListener(eventName, invoker)
    } else {//以前绑定了 当时没有value
      el.removeEventListener(eventName, exists)
      invokers[key] = undefined
    }
  }
}
function createInvoker(value) {
  const invoker = (e) => {
    invoker.value(e)
  }
  invoker.value = value;
  return invoker
}