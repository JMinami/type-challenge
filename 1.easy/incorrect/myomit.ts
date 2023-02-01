namespace MyOmit {
  interface ToDo {
    title: string,
    description: string,
    completed: boolean,
  }

  type MyOmit<T extends {}, U extends keyof T> = {
    [Key in keyof T as Key extends U ? never: Key]: T[Key]
  }

  type TodoPreview = MyOmit<ToDo, 'description' | 'title'>

  const a: TodoPreview = {
    completed: false,
  }
}