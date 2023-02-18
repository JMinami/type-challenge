namespace DeepReadonly {
  type X = {
    x: {
      a: 1,
      b: 'hi'
    },
    y: 'hey'
  }

  type DeepReadonly<T> = T extends Function ? T : {
    readonly [Key in keyof T]: Key extends Object ? DeepReadonly<T[Key]>: T[Key]
  }

  type Todo = DeepReadonly<X>
}