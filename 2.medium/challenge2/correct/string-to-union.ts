namespace StringToUnion {
  type StrintToUnion<T extends string>
  = T extends `${infer First}${infer Rest}`
  ? First | StrintToUnion<Rest>
  : never
  
  type Test = '123'
  type Result = StrintToUnion<Test>
}