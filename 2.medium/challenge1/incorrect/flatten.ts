namespace Flatten {
  type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
    ? First extends any[]
      ? [...Flatten<First>, ...Flatten<Rest>]
      : [First, ...Flatten<Rest>]
    : T


  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]>
}