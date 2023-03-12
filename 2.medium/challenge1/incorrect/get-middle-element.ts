namespace GetMiddleElement {
  type GetMiddleElement<T extends any[]> = T['length'] extends 0 | 1 | 2
  ? T
  : T extends [infer _, ...infer R, infer __]
  ? GetMiddleElement<R>
  : never;
}