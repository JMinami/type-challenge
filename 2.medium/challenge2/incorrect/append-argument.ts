namespace AppendArgument {

  type AppendArgument<F extends Function, T>
  = F extends (...args: infer R) => infer Ret
  ? (...args:[...R,T] ) => Ret
  : never

  type Fn = (a: number, b: string) => number
  type Result = AppendArgument<Fn, boolean>
}
