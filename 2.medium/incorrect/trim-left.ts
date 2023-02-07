namespace TrimLeft2 {
  type Whitespace = ' ' | '\n' | '\t'
  type TrimLeft<S extends string> = S extends `${Whitespace}${infer Left}`
  ? TrimLeft<Left>
  : S
  type trimed = TrimLeft<'  Hello World  '>
}