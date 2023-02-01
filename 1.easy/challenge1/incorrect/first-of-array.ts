namespace FirstOfArray {
  type arr1 = ['a', 'b', 'c'];
  type arr2 = [3, 2, 1];

  type NonEmptyArray<T = any> = [T,...T[]]
  type First<T extends any[]> = T extends NonEmptyArray ? T[0] : never

  type First2<T extends any[]> = T extends [infer X, ...infer R] ? X: never
  type head1 = First<arr1>
  type head2 = First2<arr2>
  const head: head1 = 'a'
}