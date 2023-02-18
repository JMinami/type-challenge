namespace merge {
  type Merge<T extends {}, U extends {}> = {
    [Key in keyof U]: U[Key]
  } & {
    [Key in keyof Omit<T, keyof U>]: T[Key]
  }

  type foo = {
    name: string;
    age: string;
  }
  type coo = {
    age: number;
    sex: string;
  }
  type Result = Merge<foo, coo>
  const a:Result = {
    name: "",
    age: 10,
    sex: "",
  }
}