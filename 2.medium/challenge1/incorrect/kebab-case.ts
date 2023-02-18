namespace KebabCase {
  type KebabCase<T extends string, Result extends string=""> 
    = T extends `${infer L}${infer R}`
      ? KebabCase<
        R, 
        `${Result}${L extends Uppercase<L>
        ? Lowercase<L> extends Uppercase<L>
          ? ""
          : Result extends ""
          ? ""
          : "-"
        : ""}${Lowercase<L>}`>
      : Result;

  type FooBarBas = KebabCase<"FooBarBaz">
}