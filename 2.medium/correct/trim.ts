namespace Trim {
  type Whitespace = ' ' | '\n' | '\t'
  type Trim<S extends string> = S extends `${Whitespace}${infer R}`
    ? Trim<R>
    : S extends `${infer L}${Whitespace}`
      ? Trim<L>
      : S 
  
  type trimmed = Trim<'  Hello World  '> 
}