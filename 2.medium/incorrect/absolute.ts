namespace Absolute {
  type Absolute<T extends (number | string | bigint)> 
    = `${T}` extends `-${infer U extends string}` 
      ? U : `${T}`;

  type Test = -100
  type Result = Absolute<Test>;
}