namespace MyIf {
  type If<B extends boolean, T, U> = B extends true ? T : U

  type A = If<false, 'a', 'b'>
  const a: A = 'b'
}