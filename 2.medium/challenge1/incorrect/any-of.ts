namespace AnyOf {
  type FalseValue = 0 | '' | null | undefined | false | [] | {[k: PropertyKey]: never}
  type AnyOf<T extends any[]> = T extends [infer F, ...infer R]
    ? F extends FalseValue
      ? AnyOf<R>
      : true
    : false
  
  type Sample1 = AnyOf<[1, '', false, [], {}]>
  type Sample2 = AnyOf<[0, '', false, [], {}]>
  type Sample3 = AnyOf<[0]>  
}