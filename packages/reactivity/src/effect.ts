export function effect(fn, options: any = {}) {// 第一个参数为要运行的方法，第二个参数为是否立即执行选项
  // 需要将这个effect变成响应的effect，可以做到数据变化重新执行

  const effect = creatReactiveEffect(fn, options);
  if (!options.lazy) {// 默认的effect会先执行
    effect();// 响应式的effect默认会先执行一次

  }

  return effect;
}

let uid = 0;// effect的唯一标识
let activeEffect// 存储当前的effect
const effectStack = []// 用栈出入保证当前effect是正确的顺序

function creatReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    if (!effectStack.includes(effect)) { // 保证effect没有加入到effectStack中
      try {
        effectStack.push(effect)
        activeEffect = effect;
        fn()// 函数执行时会取值 会执行get方法
      } finally {
        effectStack.pop()// 出栈
        activeEffect = effectStack[effectStack.length - 1]// 指针指向前一个effect
      }
    }
  }
  effect.id = uid++; // 制作一个effect标识，用于区分effect
  effect._isEffect = true;// 用于标识这个是响应式effect 
  effect.raw = fn;// 记录对应的原函数
  effect.options = options //保存用户的属性 
  return effect;
}
const targetMap = new WeakMap();
//让某个对象中的属性 收集他当前对应的effect函数
export function track(target, type, key) {
  // activeEffect // 可以拿到当前的effect

  if (activeEffect === undefined) { // 此属性不需要收集依赖，因为没在effect中使用
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map))
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, dep = new Set)
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
  }
}