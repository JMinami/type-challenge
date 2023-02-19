namespace Reverse {
  type Reverse<T extends any[]>
  = T extends [...infer Head, infer Rest]
  ? [Rest, ...Reverse<Head>]
  : T

  type a = Reverse<["a", 1, 3]>
}