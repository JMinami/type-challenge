namespace PickByType {
  type PickByType<T extends {}, U> = {
    [Key in keyof T as T[Key] extends U ? Key: never] : T[Key]
  }

  type OnlyBoolean = PickByType<{
    name: string,
    count: number,
    isReadonly: boolean,
    isEnable: boolean
  }, boolean>
}