namespace ImprovedIntersectionReduction {
  function f(x: unknown, y: {} | null | undefined) {
    x = y;
    y = x;
  }  
  console.log(f(1, 2))

  function narrowUnkownishUnion(x: {} | null | undefined){
    if (x) {
      console.log(x);
    } else {
      x;
    }
  }

  function narrowUnknown(x: unknown) {
    if (x) {
      x;
    } else {
      x;
    }
  }

  type TryGetNumberIfFirst<T> = 
    T extends [infer U extends number, ...unknown[]]
    ? U : never
  
  type a = TryGetNumberIfFirst<[1, ""]>

  // SomeNum used to be 'number'; now it's '100'.
  type SomeNum = "100" extends `${infer U extends number}` ? U : never;
  // SomeBigInt used to be 'bigint'; now it's '100n'.
  type SomeBigInt = "100" extends `${infer U extends bigint}` ? U : never;
  // SomeBool used to be 'boolean'; now it's 'true'.
  type SomeBool = "true" extends `${infer U extends boolean}` ? U : never;
}