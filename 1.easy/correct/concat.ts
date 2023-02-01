namespace Concat {
  type Concat<T extends Array<any>, U extends Array<any>> = [...T, ...U]

  type Result = Concat<[1], [2]>
  const r:Result = [1,2]
}