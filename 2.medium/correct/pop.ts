namespace Pop {
  type arr1 = ['a', 'b', 'c', 'd']

  type Pop<T extends any[]> = 
    T extends [...infer X, infer Y]
    ? X
    : never
  
  type re1 = Pop<arr1>
}