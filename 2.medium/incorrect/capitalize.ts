namespace Capitalize {
  type Capitalize<S extends string> = 
    S extends `${infer First}${infer Rest}`
      ? `${Uppercase<First>}${Rest}`
      : S
  type capitalized = Capitalize<'hello world'>
}