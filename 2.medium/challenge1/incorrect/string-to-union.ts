namespace StrintToUnion {
  type StringToUnion<T extends string> 
    = T extends `${infer L}${infer R}`
      ? `${L}` | StringToUnion<R> : never

  type Test = '123'
  type Result = StringToUnion<Test>
}