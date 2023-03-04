type KebabToCamelCase<S extends string>
= S extends `${infer First}-${infer Rest}`
  ? `${Uncapitalize<First>}${LowerCamelCase<Rest>}`
  : `${Uncapitalize<S>}`

type LowerCamelCase<S extends string>
= S extends `${infer First}-${infer Rest}`
  ? `${Capitalize<First>}${LowerCamelCase<Rest>}`
  : `${Capitalize<S>}`

type Strings = string[]
type Union = {key: string, value: string}

