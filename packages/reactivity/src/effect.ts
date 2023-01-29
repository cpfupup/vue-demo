export function effect(fn, options: any = {}) {// 第一个参数为要运行的方法，第二个参数为是否立即执行选项
  // 需要将这个effect变成响应的effect，可以做到数据变化重新执行

  const effect = creatReactiveEffect(fn, options);
  if (!options.lazy) {// 默认的effect会先执行
    effect();// 响应式的effect默认会先执行一次

  }

  return effect;
}

let uid = 0;// effect的唯一标识
function creatReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    fn()// 函数执行时会取值 会执行get方法
  }
  effect.id = uid++; // 制作一个effect标识，用于区分effect
  effect._isEffect = true;// 用于标识这个是响应式effect 
  effect.raw = fn;// 记录对应的原函数
  effect.options = options //保存用户的属性
  return effect;
}
export function track(target, key) {

}