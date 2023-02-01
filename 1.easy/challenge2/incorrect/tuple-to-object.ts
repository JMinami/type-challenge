namespace TupleToObject {
  const tuple = ['tesla', 'model 3', 'model X'] as const

  type TupleToObject<T extends readonly (string | number | symbol)[]> = {
    [K in T[number]]: K
  }
  type result = TupleToObject<typeof tuple>
}