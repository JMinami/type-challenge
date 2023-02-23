namespace TrimLeft {
  type TrimLeft<T extends string>
  = T extends ` ${infer S}`
  ? TrimLeft<S>
  : T

  type trimed = TrimLeft<'  Hello World  '>
}