namespace Parameters {
  type MyParameters<T extends Function> =
    T extends (...args: infer R) => any 
    ? R
    : never

  const foo = (arg1: string, arg2: string): void => {}
  type FunctionParamsType = MyParameters<typeof foo>
}