type tuple = ["a", 1]
type TupleToObject<T extends readonly any[]> = {
  [Key in T[number]]: Key
}

type result = TupleToObject<tuple>
