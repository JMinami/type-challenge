type b = ["a", 1]
type LengthOftuple<T extends any[]> = T["length"]
type length = LengthOftuple<b>