namespace AppendToObject {
  type AppendToObject<T extends object, U extends PropertyKey, R extends any> 
    = {
      [Key in (keyof T | U)]: Key extends keyof T ? T[Key] : R 
    }

  type Test = {id: '1'}
  type Result = AppendToObject<Test, 'value', 4>
}