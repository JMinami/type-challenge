namespace Merge {
  type Merge<T extends {}, U extends {}>
  = {
    [Key in keyof T]: T[Key]
  } & {
    [Key2 in keyof Omit<U, keyof T>]: U[Key2]
  }

  type foo = {
    name: string;
    age: string;
  }
  type coo = {
    age: number;
    sex: string
  }

  type Result = Merge<foo, coo>
}