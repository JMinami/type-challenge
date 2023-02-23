namespace ReplaceAll {
  type ReplaceAll<T extends string, C1 extends string, C2 extends string>
  = T extends `${infer Head}${C1}${infer Rest}`
  ? `${Head}${C2}${ReplaceAll<Rest, C1, C2>}`
  : T

  type replaced = ReplaceAll<' t y p e s', ' ', ''>
}