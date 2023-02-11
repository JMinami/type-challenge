namespace Concat {
  type Concat<T, U >
    = T extends [infer R]
      ? U extends [infer K]
        ? [R, K]
        : never
      : never

  type Result = Concat<[1], [2]>
}