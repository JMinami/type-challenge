namespace IsNever{
  type IsNever<T> 
  = [T] extends [never] ? true : false

  type A = IsNever<never>
  type B = IsNever<undefined>
  type C = IsNever<null>
  type D = IsNever<[]>
  type E = IsNever<number>
}