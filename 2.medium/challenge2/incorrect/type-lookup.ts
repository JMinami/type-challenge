namespace TypeLookup {
  type LookUp<U, T extends string> = {
    [K in T]: U extends { type: K} ? U : never
  }[T]

  interface Cat {
    type: 'cat'
  }
  interface Dog {
    type: 'dog'
  }

  type MyDogType = LookUp<Cat | Dog, 'dog'>
}