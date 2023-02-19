namespace TupleToNestedObject {
  type TupleToNestedObject<T extends any[],U extends PropertyKey> 
  = T extends [infer First extends PropertyKey, ...infer Rest]
  ? Record<First, TupleToNestedObject<Rest, U>>: U
}