namespace PercentageParser {
  type PercentageParser<A extends string> =
  A extends `${infer First}${infer Rest}`
    ? First extends "+" | "-"
      ? A extends `${infer First}${infer Rest}%`
        ? [First, Rest, "%"]
        : [First, Rest, ""]
      : First extends `%`
      ? ["", "", `%`]
      : A extends `${infer First}${infer Rest}%`
      ? ["", `${First}${Rest}`, "%"]
      : ["", `${First}${Rest}`, ""]
    : ["", "", ""];

  type r1 = PercentageParser<'+85'>
}