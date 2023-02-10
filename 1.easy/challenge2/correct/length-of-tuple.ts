namespace LengthOfTuple {
  type LengthOfTuple<T extends any[]> = T['length']

  type len = LengthOfTuple<["1", "b"]>
}