namespace Unshift {
  type Unshift<T extends any[], U> 
  = T extends [...infer R]
  ? [U, ...R]
  : never

  type Result = Unshift<[1, 2], 0>
}