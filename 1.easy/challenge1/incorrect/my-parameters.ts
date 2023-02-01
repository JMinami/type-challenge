namespace MyParameters {
  const foo = (arg1: string, arg2: number): void => {}

  type MyParameters<T extends (...args: any[])=> any> = 
    T extends (...args: infer Args extends any[]) => any
    ? Args
    : never

  type FunctionParamsType = MyParameters<typeof foo>
}