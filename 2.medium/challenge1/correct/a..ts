namespace All {
  type All<T extends Array<any>, U> = 
  T extends [infer First, ...infer Rest]
  ? First extends U
    ? All<Rest, U>
    : false
  : true

  type Test1 = [1, 1, 1]

  type a = All<Test1, 1>
  type b= All<[1,1,2], 1>
}