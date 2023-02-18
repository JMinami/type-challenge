namespace Concat {
  type Concat<T extends any[], U extends any[]> 
    = T extends [...infer R]
      ? U extends [...infer S]
        ? [...R, ...S]
        : [...R]
      : never
  
  type Result = Concat<[1], [2]>
}