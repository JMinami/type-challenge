namespace Absolute {
  type Absolute<T extends number>
  = `${T}` extends `-${infer R}`
  ? R
  : T

  type Test = -100;
  type Result = Absolute<Test>
}