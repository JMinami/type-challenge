namespace PartialByKeys {
  type PartialByKeys<T extends {}, U extends string> = {
    [Key in keyof T as Key extends U ? Key: never]?: T[Key]
  } & {
    [Key in keyof T as Key extends U ? never: Key]: T[Key]
  }

  interface User {
    name: string,
    age: number,
    address: string,
  }

  type UserParialName = PartialByKeys<User, 'name'>
}