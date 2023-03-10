namespace IsUnion {
  type IsUnion<T, K = T> 
  = [T] extends [never] 
  ? false 
  : T extends K 
    ? [K] extends [T] 
      ? false 
    : true 
  : never
}