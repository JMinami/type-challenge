namespace FibonacciSequence {
  type Fibonacci<T extends number, A extends unknown [] = [1], B extends unknown[] = [], Index extends unknown [] = []> = Index['length'] extends T ? B['length'] : Fibonacci<T, B, [...A, ...B], [...Index, 1]>

}