namespace ChaiinableOptions {
  type Chainable<X extends Object = {}> = {
    option<T extends string, K>(key: T extends keyof X?never:T, value: K)
      : Chainable<
        Omit<X, T> & 
          { [k in T]: K}>
    get(): X
  }
  declare const config:Chainable
  const result = config
    .option('foo', 123)
    .option('name', 'type-challenge')
    .option('bar', { value: "Hello World"})
    .get()
}