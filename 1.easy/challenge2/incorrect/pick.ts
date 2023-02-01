namespace Pick {
  interface Todo {
    title: string
    description: string
    comleted: string
  }

  type MyPick<T extends {}, U extends keyof T> = {
    [Key in U]: T[Key]
  }

  type TodoPreview = MyPick<Todo, 'title' | 'description'>

  const todo: TodoPreview = {
    title: "test",
    description: 'aa' 
  }
}