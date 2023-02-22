namespace ChainableOptions {
  type Chainable<T = {}> = {
    option: <K extends string, V>(key: K extends keyof T ? never: K, value: V) 
      => Chainable<Omit<T,K> & Record<K, V>>
    get: () => T
  }

  declare const config: Chainable
  const result = config
    .option('foo', 1)
    .option('bar', {value: 'hello'})
    .get()
  
  result.bar = {value: 'string'}
}