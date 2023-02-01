namespace LastOfArray {
  type arr1 = ['a', 'b', 'c']

  type Last<T extends any[]> = T extends [...infer X, infer R]? R: any

  type tail1 = Last<arr1>
}