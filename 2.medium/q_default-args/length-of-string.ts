namespace LengthOfString {
  type LengthOfString<S extends string, Counter extends string[]=[]>
  = S extends `${infer First}${infer Rest}`
  ? LengthOfString<Rest, [First, ...Counter]>
  : Counter['length']

  type a = LengthOfString<"test">
}