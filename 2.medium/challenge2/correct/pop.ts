namespace Pop {
  type Pop<T extends any[]> 
  = T extends [...infer Head, infer last]
  ? Head
  : never


  type re1 = Pop<["a", 'b', 'c']>
}