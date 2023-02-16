export const patchStyle = (el, prev, next) => {
  const style = el.style;//获取样式
  if (next == null) {
    el.removeAttribute('style')
  } else {
    //老的里有 新的没有  需要删除
    if (prev) {
      for (let key in prev) {
        if (next[key] == null) {
          style[key] = ' ';
        }
      }
    }
    //新的里面需要赋值到style上
    for (let key in next) {
      style[key] = next[key]
    }
  }
}