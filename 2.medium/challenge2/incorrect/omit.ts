namespace MyOmit {
  type MyOmit<T extends {}, U extends keyof T> = {
    [Key in keyof T as Key extends U ? never: Key]: T[Key]
  }

  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>
}