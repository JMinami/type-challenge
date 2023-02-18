namespace Parameters {
  type MyParameters<T extends Function>
  = T extends (...a: infer R) => any
  ? R
  : never

  type a = MyParameters<(arg1: string, arg2: number) => void>
}