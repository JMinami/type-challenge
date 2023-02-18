interface Todo {
  title: string
  description: string
  completed: boolean
}

type MyPick<T extends {}, K extends keyof T> = {
  [Key in K]: T[Key]
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>