namespace Push {
  type Push<T extends Array<any>, U>
    = T extends [...infer R]
      ? [...R, U]
      : never
  type Result = Push<[1,2], '3'>
}