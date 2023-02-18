type arr1 = ['1', 'b', 'c']
type First<T extends any[]> = 
  T extends [infer First, ...infer Rest]
  ? First
  : never

  type head = First<arr1>