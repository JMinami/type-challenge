namespace AppearOnlyOnce {
  type Exist<T extends Array<any>, U> = T extends [infer First, ...infer Rest] 
    ? First extends U 
      ? true 
      : Exist<Rest, U>
    : false

  type AppearOnlyOnce<T extends Array<any>, U extends Array<any> = []>
  = T extends [infer First, ...infer Rest]
  ? Exist<U, First> extends true
    ? AppearOnlyOnce<Rest, U> 
    : AppearOnlyOnce<Rest, [...U, First]> 
  : U

  type b = AppearOnlyOnce<[1,1,2,3,4,4,3,5]>
}