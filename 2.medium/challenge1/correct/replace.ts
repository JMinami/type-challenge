namespace Replace {
  type Replace<S extends string, T extends string, U extends string> 
    = S extends `${infer First}${T}${infer Last}`
      ? `${First}${U}${Last}`
      : S
  type replaced = Replace<'types are fun!', 'fun', 'awesome'>
}