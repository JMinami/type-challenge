namespace TupleToUnion {
  type Arr = ['1', '2', '3']
  type TupleToUnion<T extends any[]> = T[number]

  type Test = TupleToUnion<Arr>

}