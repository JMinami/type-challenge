namespace Myreadonly {
  interface Todo {
    title: string,
    description: string,
  }

  type MyReadonly<T> = {
    readonly [property in keyof T]: T[property]
  } 

  const todo:MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar"
  }

  todo.title = "hello"

}
