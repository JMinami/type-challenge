namespace Includes{
  type Equal<X, Y> = 
  (<T>() => T extends X ? 1: 2) extends
  (<T>()=> T extends Y ? 1: 2) ? true: false

  type Includes<T extends Array<any>, U> = T extends [
    infer First,
    ...infer Rest
  ]
    ? Equal<First, U> extends true
      ? true
      : Includes<Rest, U>
    : false 


  type isPillarMen = Includes<['a', 'b'], 'b'>
  const a: isPillarMen = true
}