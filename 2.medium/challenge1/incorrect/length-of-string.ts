namespace LengthOfString {
  type LengthOfString<S extends string, Res extends unknown[] = []> =
    S extends `${infer Head}${infer Rest}`
    ? LengthOfString<Rest, [...Res, Head]>
    : Res['length']
  
  type a = LengthOfString<'test'>
}