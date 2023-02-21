namespace BemStyleString {
  type E<T extends any[]> 
  = T extends [infer First extends string, ...infer Rest] 
  ? `${First}__${E<[Rest]>}`
  : T

  type BemStyleString<B extends string,E extends string[], M extends string[]>
  = {} 
}