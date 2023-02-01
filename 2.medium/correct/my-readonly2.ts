namespace MyReadonly2 {
  interface Todo {
    title: string,
    description: string,
    completed: boolean
  }

  type MyReadonly2<T extends {}, U extends keyof T> = Readonly2<T, U> & Writable<T, U>
  type Readonly2<T extends {}, U extends keyof T> = {
    readonly [key in keyof T as key extends U ? key: never]: T[key]
  }

  type Writable<T extends {}, U extends keyof T> = {
    [key in keyof T as key extends U ? never: key]: T[key]
  }

  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "hey",
    "description": "foobar",
    completed: false,
  }
  // todo.title = ""
  // todo.description = ""
  todo.completed = true
}