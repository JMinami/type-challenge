namespace FilpArguments {
  type Reverse<T extends any[]> 
  = T extends [...infer Head, infer Last]
  ? [Last, ...Reverse<Head>]
  : T

  type FlipArguments<T extends Function>
  = T extends (...args: infer Head) => infer Ret
  ? (...args: Reverse<Head>) => Ret
  : never

  type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>
}