namespace TupleToObject {
  type TupleToObject<T> = T extends [infer First, ...infer Rest]
  ? {
    First: First,
  } & TupleToObject<Rest> 
  : {
    T
  }

  const tuple = ['1', 1] as const;
  type t = typeof tuple;

  type result = TupleToObject<t>
}