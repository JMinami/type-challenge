namespace ReadOnly2 {
  type MyReadOnly<T extends {}, U extends keyof T> = {
    readonly [Key in keyof T as Key extends U ? Key : never]: T[Key]
  }& {
    [Key in keyof T as Key extends U ? never : Key]: T[Key]
  }

  interface Todo {
    title: string
    description: string
  }
  type todo =  MyReadOnly<Todo, 'title'>

}