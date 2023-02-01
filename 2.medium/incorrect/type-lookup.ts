namespace TypeLookup {
  interface Cat {
    type: 'cat',
    breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
  }
  interface Dog {
    type: 'dog'
    bredds: 'Hound' | 'brittany' | 'Bulldog' | 'Boxer'
    color: 'brown' | 'white' | 'black'
  }
  type Loogkup<U, T> = U extends U
    ? U extends {
      type: infer R
    } & Record<any, any>
      ? T extends R
        ? U
        : never
      : never
    : never

  type MyDog = Loogkup<Cat | Dog, 'dog'>
}
