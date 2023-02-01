namespace Readonly {
  interface Todo {
    title: string
    description: string
  }

  type MyReadonly<T> = T extends {} ? {
    readonly [Key in keyof T]: T[Key]
  }: never

  const todo: MyReadonly<Todo> = {
    title: "hey",
    description: "foobar"
  }
}