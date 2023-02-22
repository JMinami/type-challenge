namespace TupleToUnion {
  type TupleToUnion<T extends unknown[]> = T[number]

  type Arr = ['1', '2', 3, 4]
  type Test = TupleToUnion<Arr>
}