namespace LastOfArray {
  type Last<T extends Array<any>> 
  = T extends [...infer Head, infer Last]
  ? Last
  : never

  type tail1 = Last<['1', 'b', 'c']>
}