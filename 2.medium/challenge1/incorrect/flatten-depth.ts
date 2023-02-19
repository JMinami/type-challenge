namespace FlattenDepth {
  type Flatten<T> = T extends [infer R] 
  ? R
  : T

  type FlattenOnce<T extends any[]> = T extends [infer Head, ...infer Rest]
  ? [Flatten<Head>, ...FlattenOnce<Rest>]
  : T

  type FlattenDepth<T extends unknown[], N extends number = 1, Acc extends unknown[] = []> 
  = T extends FlattenOnce<T> 
  ? T 
    : Acc['length'] extends N
    ? T
  : FlattenDepth<FlattenOnce<T>, N, [...Acc, 1]>;

  type a = FlattenDepth<[1, 2, [[3]], [[[4]]]], 3>

}