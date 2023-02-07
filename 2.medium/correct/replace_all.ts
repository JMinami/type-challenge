namespace ReplaceAll {
  type ReplaceAll<S extends string, T extends string, U extends string> 
    = S extends `${infer First}${T}${infer Last}`
      ? ReplaceAll<`${First}${U}${Last}`, T, U>
      : S
  
  type replaced = ReplaceAll<' t y p e s', ' ', ''>
}