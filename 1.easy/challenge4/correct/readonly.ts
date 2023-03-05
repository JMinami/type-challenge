namespace Readonly {
  type MyReadonly<T extends {}> = {
    readonly[Key in keyof T]: T[Key]
  }

  interface Todo {
    title: string
  }

  type MyTodo = MyReadonly<Todo>
}