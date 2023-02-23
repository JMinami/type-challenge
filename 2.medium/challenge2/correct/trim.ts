namespace Trim {
  type Trim<T extends string>
  = T extends ` ${infer S}`
  ? Trim<S>
  : T extends `${infer S} `
    ? Trim<S>
    : T
  
    type trimmed = Trim<'  Hello World  '>
}