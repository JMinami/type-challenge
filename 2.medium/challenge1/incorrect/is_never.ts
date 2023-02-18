namespace IsNever {
  type IsNever<T extends any> = [T] extends [never] ? true : false;

  type A = IsNever<never>
  type B = IsNever<undefined>
  type C = IsNever<null>

}