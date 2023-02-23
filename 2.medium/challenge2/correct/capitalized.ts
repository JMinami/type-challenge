namespace Capitalized {

  type CapitalizedWord<T extends string>
  = T extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : T

  type Capitalized<T extends string>
  = T extends `${infer First extends string} ${infer Rest extends string}`
  ? `${CapitalizedWord<First>} ${Capitalized<Rest>}`
  : CapitalizedWord<T>

  type capitalized = Capitalized<'hello world'>
}