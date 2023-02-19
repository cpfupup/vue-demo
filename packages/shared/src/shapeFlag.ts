export const enum shapeFlags {
  ELEMENT = 1, //1
  FUNCTIONAL_COMPONENT = 1 << 1, //2
  STATEFUL_COMPONENT = 1 << 2, //4
  TEXT_CHILDREN = 1 << 3, //8
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
  COMPONENT = shapeFlags.STATEFUL_COMPONENT | shapeFlags.FUNCTIONAL_COMPONENT
}
// 位运算是以前人总结出来的做权限判断和类型 位运算都是最佳实践
// 2进制 一个字节由8个位组成 8个位组大都是1