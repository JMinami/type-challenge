namespace Pick {
  type MyPick<T extends {}, U extends keyof T> = {
    [Key in keyof T as Key extends U ? Key : never]: T[Key]
  }

  interface Todo {
    title: string
    description: string
    completed: boolean
  }  
  type TodoPreview = MyPick<Todo, 'title' | 'completed'>
}