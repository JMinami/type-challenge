namespace AppendToObject {
  type AppendToObject<T extends {}, Key extends string, Value>
  = {
    [K in keyof T | Key] : K extends keyof T ? T[K] : Value
  }
  type Test = {id: 1}
  type res = AppendToObject<Test, 'value', 4>
  const a:res = {
    value: 4,
    id: 1,
  }
}