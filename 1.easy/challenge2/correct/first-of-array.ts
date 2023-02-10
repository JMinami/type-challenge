namespace FirstOfArray {
  type FirstOfArray<T extends any[]> 
    = T extends [infer First, ...infer Rest]
      ? First
      : never
  
  type head1 = FirstOfArray<['1', 'b', 'c']>
}