namespace DeepReadonly {
  type DeepReadonly<T extends {}> = {
    readonly [Key in keyof T]: T[Key] extends infer R extends {} ? DeepReadonly<R> : T[Key]
  }

  type X = {
    x: {
      a: 1
      b: 'h1'
    }
    y: 'hey'
  }

  type Todo = DeepReadonly<X> 
  const t: Todo = {
    x: {
      a: 1,
      b: 'h1',
    },
    y: 'hey'
  }
}