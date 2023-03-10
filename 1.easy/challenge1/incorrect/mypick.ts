namespace Pick {
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  type MyPick<T, K extends keyof T> = {
    [property in K]: T[K]
  }
  type TodoPreview = MyPick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
  }

  console.log(todo)
}