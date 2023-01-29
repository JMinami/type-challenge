namespace FirstOfArray {
  type arr1 = ['a', 'b', 'c'];
  type arr2 = [3, 2, 1];

  type NonEmptyArray<T = any> = [T,...T[]]
  type First<T extends any[]> = T extends NonEmptyArray ? T[0] : never

  type head1 = First<arr1>
  const head: head1 = 'a'
}