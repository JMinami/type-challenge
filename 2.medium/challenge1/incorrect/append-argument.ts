namespace AppendArgument {
  type Fn = (a: number, b: string) => number

  type AppendArgument<T extends (...args: any[])=>any, U> 
    = T extends (...args: infer R) => infer O
      ? (args:[...R, U]) => O
      : never
  type Result = AppendArgument<Fn, boolean>
}