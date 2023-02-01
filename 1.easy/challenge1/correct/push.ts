namespace Push{
  type Push<T extends Array<any>, U> = [...T, U]

  type Result = Push<[1,2], '3'>

  const r: Result = [1, 2, '3']
}