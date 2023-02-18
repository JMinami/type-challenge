namespace OmitByType {
  type OmitByType<T extends {}, U> = {
    [Key in keyof T as T[Key] extends U ? never: Key]: T[Key]
  }

  type OmitBoolean = OmitByType<{
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  }, boolean>
}