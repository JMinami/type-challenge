type MyReadonly<T extends object> = {
  readonly [Key in keyof T]: T[Key] 
}

interface Todo2 {
  title: string
  description: string
}

type a = MyReadonly<Todo2>