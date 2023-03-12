namespace Currying {
  const add = (a: number, b: number) => a + b;

  type Curry<P extends readonly any[], R> = P extends []
  ? R
  : P extends [infer H, ...infer T]
  ? (arg: H) => Curry<T, R>
  : R

declare function Currying<P extends readonly any[], R extends boolean>(
  fn: (...args: P) => R
): P extends [] ? () => R : Curry<P, R>

  const curryingAdd = Currying(add)
  const five = curryingAdd(2)(3)

  console.log(five)
}